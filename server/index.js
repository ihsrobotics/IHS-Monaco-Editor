const express = require("express");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const { exec, spawn } = require("child_process");
const cors = require("cors");
const os = require("os");
const archiver = require("archiver");
const multer = require("multer");
const unzipper = require("unzipper");
const { pythonBoilerplate, cppBoilerplate } = require("./server-config.json");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// directory path of all editor files
const DIRECTORY_PATH = path.join(process.env.HOME, "Documents", "IME_files");

const upload = multer({ dest: DIRECTORY_PATH });

if (!fsSync.existsSync(DIRECTORY_PATH)) {
  fsSync.mkdirSync(DIRECTORY_PATH, { recursive: true });
}

process.env.PYTHONUNBUFFERED = "1";

async function formatFileHierarchy(directoryPath) {
  const fileHierarchy = {};
  // Read the contents of the directory
  try {
    const files = await fs.readdir(directoryPath);

    // Iterate over each file in the directory
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.stat(filePath);

      // Check if the file is a directory
      if (stat.isDirectory()) {
        // Recursively format the subdirectory
        fileHierarchy[file] = {
          name: file,
          type: "directory",
          ...(await formatFileHierarchy(filePath)),
        };
      } else {
        // Format the file information
        fileHierarchy[file] = {
          name: file,
          type: "file",
        };
      }
    }

    return fileHierarchy;
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
}

app.get("/api/getFile", async (req, res) => {
  const encodedFileName = req.query.filename;

  if (!encodedFileName) {
    return res.status(400).json({ error: "filename parameter is required" });
  }

  const fileName = decodeURIComponent(encodedFileName);

  try {
    const content = await fs.readFile(
      path.join(DIRECTORY_PATH, fileName),
      "utf-8"
    );
    res.json(content);
  } catch (error) {
    res.status(404).json({ error: "error loading the file" });
  }
});

app.get("/api/getFileHierarchy", async (req, res) => {
  try {
    res.json(await formatFileHierarchy(DIRECTORY_PATH));
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/api/shell", (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: "command parameter is required" });
  }
  exec(command, { cwd: DIRECTORY_PATH }, (error, output) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    } else {
      res.status(200).send("shell command handled successfully");
    }
  });
});

app.post("/api/saveFile", async (req, res) => {
  const { fileName, content } = req.body;
  if (!fileName || content === undefined) {
    return res
      .status(400)
      .json({ error: "Filename and content parameter are required" });
  }

  await fs.writeFile(path.join(DIRECTORY_PATH, fileName), content, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
  });
  res.status(200).send(fileName + " saved successfully");
});

app.post("/api/writeBp", async (req, res) => {
  const { filePath, boilerplate } = req.body;
  if (!filePath || boilerplate === undefined) {
    return res
      .status(400)
      .json({ error: "Filename and content parameter are required" });
  }
  try {
    if (boilerplate === "py-bp") {
      await fs.writeFile(
        path.join(DIRECTORY_PATH, filePath, "src", "main.py"),
        pythonBoilerplate,
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
      res.status(200).send("success");
    } else if (boilerplate === "py-nobp") {
      await fs.writeFile(
        path.join(DIRECTORY_PATH, filePath, "src", "main.py"),
        "",
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
      res.status(200).send("success");
    } else if (boilerplate === "cpp-bp") {
      await fs.writeFile(
        path.join(DIRECTORY_PATH, filePath, "src", "main.cpp"),
        cppBoilerplate,
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
      res.status(200).send("success");
    } else if (boilerplate === "cpp-nobp") {
      await fs.writeFile(
        path.join(DIRECTORY_PATH, filePath, "src", "main.cpp"),
        "",
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
      res.status(200).send("success");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/getPath", async (req, res) => {
  res.send({
    user: `${os.userInfo().username}@${os.hostname()}`,
    home: process.env.HOME,
    path: DIRECTORY_PATH,
  });
});

app.post("/api/liveShell", (req, res) => {
  const { command, cwd } = req.body;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  // need sleep between command and getting directory to stop them from literally colliding with each other
  const childProcess = spawn(
    "bash",
    ["-c", `"${command} && sleep 0.1 && echo -n '__PATH__:' && pwd"`],
    { stdio: "pipe", shell: true, cwd: cwd }
  );
  res.write(JSON.stringify({ pid: childProcess.pid }) + "\r\n");
  childProcess.stdout.on("data", (data) => {
    const formattedData = data.toString();

    // path data
    if (formattedData.includes("__PATH__")) {
      res.write(
        "\r\n" +
          JSON.stringify({
            path: formattedData
              .substring(formattedData.indexOf(":") + 1)
              .trim(),
          })
      );
    }
    // regular output
    else {
      res.write("\r\n" + JSON.stringify(formattedData));
    }
  });
  childProcess.stderr.on("data", (data) => {
    const formattedData = data.toString();
    if (
      formattedData.includes("cd:") &&
      formattedData.includes("No such file or directory")
    ) {
      res.write("\r\n" + JSON.stringify({ path: "invalid" }));
    }
    res.write("\r\n" + JSON.stringify(data.toString()));
  });
  childProcess.on("close", () => {
    // res.write(JSON.stringify(`Command exited with code ${code}`));
    res.end();
  });
});

function isProcess(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return false;
  }
}

app.post("/api/kill", (req, res) => {
  const { pid } = req.body;
  if (isProcess(Number.parseInt(pid) + 1))
    process.kill(Number.parseInt(pid) + 1, "SIGINT");
  setTimeout(() => {
    if (isProcess(Number.parseInt(pid) + 1))
      process.kill(Number.parseInt(pid) + 1, "SIGINT");
  }, 100);
  setTimeout(() => {
    if (isProcess(Number.parseInt(pid) + 1))
      process.kill(Number.parseInt(pid) + 1, "SIGTERM");
  }, 200);
});

app.post("/api/downloadProject", (req, res) => {
  const { projectName } = req.body;
  if (!projectName) {
    return res.status(400).json({ error: "Folder name is required" });
  }
  const folderPath = path.join(DIRECTORY_PATH, projectName);
  if (!fsSync.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(res);
  archive.directory(folderPath, false);
  archive.finalize();
  res.attachment(`${projectName}.zip`);
});

function extractZip(zipFilePath, extractPath) {
  return new Promise((resolve, reject) => {
    fsSync
      .createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on("entry", (entry) => {
        const filePath = path.join(extractPath, entry.path);
        if (entry.type === "File") {
          entry.pipe(fsSync.createWriteStream(filePath));
        } else if (entry.type === "Directory") {
          fsSync.mkdirSync(filePath, { recursive: true });
        }
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("close", () => {
        resolve();
      });
  });
}

app.post("/api/uploadProject", upload.single("file"), async (req, res) => {
  const zipFilePath = req.file.path;
  const projectName = req.file.originalname.slice(0, -4);
  try {
    await extractZip(zipFilePath, path.join(DIRECTORY_PATH, projectName));
    fsSync.unlinkSync(zipFilePath);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Error unzipping file.");
  }
});

app.post("/api/session", (req, res) => {
  const {id} = req.body;
  res.send({id: id});
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

// npm run dev
