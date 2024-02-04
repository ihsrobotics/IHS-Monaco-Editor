import React from "react";
import { ToastFunction } from "../components/Toast/context/ToastContext";
import { ADDRESS, PORT } from "../env/address";

export function rename(
  oldName: string,
  loadFiles: () => void,
  toast: ToastFunction
) {
  let newName = prompt("new file name: ");
  if (newName == null) {
    return;
  }
  newName = newName.replace(/[^a-zA-Z0-9_-]/g, "");
  newName = oldName.slice(0, oldName.lastIndexOf("/")) + "/" + newName;
  fetch("http://" + ADDRESS + ":" + PORT + "/api/shell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "mv " + oldName + " " + newName }),
  })
    .then((response) => {
      if (response.status == 200) {
        toast(true, "success", "renamed successfully");
      } else {
        toast(true, "warning", "status " + response.status);
      }
      loadFiles();
    })
    .catch((error) => {
      console.log("Error:", error);
      toast(true, "error", error);
    });
}

export function deleteItem(
  name: string,
  loadFiles: () => void,
  toast: ToastFunction
) {
  if (!confirm("delete " + name + "?")) {
    return;
  }
  fetch("http://" + ADDRESS + ":" + PORT + "/api/shell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "rm -rf " + name }),
  })
    .then((response) => {
      if (response.status == 200) {
        toast(true, "success", "deleted successfully");
      } else {
        toast(true, "warning", "status " + response.status);
      }
      loadFiles();
    })
    .catch((error) => {
      console.log("Error:", error);
      toast(true, "error", error);
    });
}

export async function newFile(
  path: string,
  loadFiles?: () => void,
  toast?: ToastFunction,
  newFileName?: string
) {
  let fileName = newFileName ? newFileName : prompt("new file name: ");
  if (fileName == null) {
    return;
  }
  fileName = fileName.replace(/[^a-zA-Z0-9_\-.]/g, "");
  await fetch("http://" + ADDRESS + ":" + PORT + "/api/shell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "touch " + path + "/" + fileName }),
  })
    .then((response) => {
      if (toast) {
        if (response.status == 200)
          toast(true, "success", "created successfully");
        else toast(true, "warning", "status " + response.status);
      }
      if (loadFiles) loadFiles();
    })
    .catch((error) => {
      console.log("Error:", error);
      if (toast) toast(true, "error", error);
      throw error;
    });
}

export async function newFolder(
  parentDirName: string,
  loadFiles?: () => void,
  toast?: ToastFunction,
  newFolderName?: string
) {
  let folderName = newFolderName ? newFolderName : prompt("new folder name: ");

  if (folderName == null) {
    return;
  }
  folderName = folderName.replace(/[^a-zA-Z0-9_\-.]/g, "");
  await fetch("http://" + ADDRESS + ":" + PORT + "/api/shell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      command:
        "mkdir " +
        parentDirName +
        (parentDirName === "" ? "" : "/") +
        folderName,
    }),
  })
    .then((response) => {
      if (toast) {
        if (response.status == 200)
          toast(true, "success", "created successfully");
        else toast(true, "warning", "status " + response.status);
      }
      if (loadFiles) loadFiles();
    })
    .catch((error) => {
      console.log("Error:", error);
      if (toast) toast(true, "error", error);
      throw error;
    });
}

export async function getFile(path: string) {
  const response = await fetch(
    "http://" + ADDRESS + ":" + PORT + "/api/getFile?filename=" + path,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function saveFile(
  fileName: string,
  fileContent: string,
  setIsFinished?: React.Dispatch<boolean>,
  toast?: ToastFunction
) {
  console.log(fileName);
  await fetch("http://" + ADDRESS + ":" + PORT + "/api/saveFile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: fileName, content: fileContent }),
  })
    .then((response) => {
      if (toast) {
        if (response.status == 200 || response.status == 204)
          toast(
            true,
            "success",
            fileName.split("/").slice(-1).toString() + " saved successfully"
          );
        else toast(true, "warning", "status " + response.status);
      }
      if (setIsFinished) setIsFinished(false);
    })
    .catch((error) => {
      console.log("Error:", error);
      if (toast) toast(true, "error", error);
      throw error;
    });
}

export async function command(
  command: string,
  toast?: ToastFunction,
  successMessage?: string
) {
  try {
    const response = await fetch(
      "http://" + ADDRESS + ":" + PORT + "/api/shell",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: command }),
      }
    );
    if (toast && successMessage) {
      if (response.status == 200) toast(true, "success", successMessage);
      else
        toast(
          true,
          "warning",
          "status " + response.status + " " + response.json()
        );
    }
    return response.json();
  } catch (error) {
    if (toast && successMessage) toast(true, "error", error as string);
    throw error;
  }
}

const keyEnterEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  code: "Enter",
  keyCode: 13,
  which: 13,
});

export async function compileProject(project: string, toast: ToastFunction) {
  const config = JSON.parse(
    await getFile(
      project.split("/").slice(0, 2).join("/") + "/.editor/config.json"
    )
  );
  if (config["compile"].trim() === "") {
    toast(true, "error", "compile command not set");
    return;
  }
  document.getElementById("terminalInput")!.innerText = config["compile"];
  document.getElementById("terminalInput")?.dispatchEvent(keyEnterEvent);
}

export async function runProject(project: string, toast: ToastFunction) {
  const config = await JSON.parse(
    await getFile(
      project.split("/").slice(0, 2).join("/") + "/.editor/config.json"
    )
  );
  if (config["run"].trim() === "") {
    toast(true, "error", "run command not set");
    return;
  }
  document.getElementById("terminalInput")!.innerText = config["run"];
  document.getElementById("terminalInput")?.dispatchEvent(keyEnterEvent);
}
export async function stopRunProject(pid: number) {
  keyInt(pid);
}

const isValidJSON = (str: string) => {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch (e) {
    return null;
  }
};

function readShellOutput(
  value: Uint8Array | undefined,
  setPID: React.Dispatch<number>,
  oldTerminalOutput: [string, string, string][],
  newTerminalOutput: [string, string, string],
  setOutput: React.Dispatch<[string, string, string][]>,
  setCurrentDir: React.Dispatch<string>,
  ret: string
) {
  const decodedValue = new TextDecoder().decode(value);
  console.log("decoded value:", decodedValue);
  decodedValue.split("\r\n").forEach((value) => {
    // this is the passed back PID
    const parsedObject = isValidJSON(value);
    if (parsedObject !== null && parsedObject["pid"] != undefined) {
      console.log("pid found:", parsedObject["pid"]);
      setPID(Number.parseInt(parsedObject["pid"]) + 1);
    }
    // this is the passed back new path
    else if (parsedObject !== null && parsedObject["path"] != undefined) {
      console.log("path found:", parsedObject["path"]);
      parsedObject.path !== "invalid"
        ? setCurrentDir(parsedObject["path"])
        : null;
      console.log("set current dir", parsedObject["path"]);
    }
    // this is regular output
    else if (value !== "") {
      console.log("regular value:", value);
      ret += value.substring(1, value.length - 1);
      setOutput([
        ...oldTerminalOutput.slice(0, oldTerminalOutput.length - 1),
        [
          newTerminalOutput[0],
          newTerminalOutput[1],
          newTerminalOutput[2] + ret,
        ],
      ]);
      document.querySelector(".app-bottomBar-content")!.scrollTop =
        document.querySelector(".app-bottomBar-content")!.scrollHeight;
    }
  });
  return ret;
}

export async function liveShell(
  command: string,
  cwd: string,
  setPID: React.Dispatch<number>,
  setIsFinished: React.Dispatch<boolean>,
  oldTerminalOutput: [string, string, string][],
  newTerminalOutput: [string, string, string],
  setOutput: React.Dispatch<[string, string, string][]>,
  setCurrentDir: React.Dispatch<string>
) {
  const response = await fetch(
    "http://" + ADDRESS + ":" + PORT + "/api/liveShell",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: command, cwd: cwd }),
    }
  );
  const reader = response.body?.getReader();
  let ret = "";
  const { done, value } =
    (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;
  ret = readShellOutput(
    value,
    setPID,
    oldTerminalOutput,
    newTerminalOutput,
    setOutput,
    setCurrentDir,
    ret
  );
  while (!done) {
    const { done, value } =
      (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;

    if (done) {
      console.log("done");
      setIsFinished(true);
      // wait for the rerender to finish before setting the focus
      setTimeout(() => {
        document.getElementById("terminalInput")?.focus();
      }, 100);
      break;
    }
    ret = readShellOutput(
      value,
      setPID,
      oldTerminalOutput,
      newTerminalOutput,
      setOutput,
      setCurrentDir,
      ret
    );
  }
}

export function keyInt(pid: number | undefined) {
  if (pid == undefined) return;
  fetch("http://" + ADDRESS + ":" + PORT + "/api/kill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pid: pid }),
  });
}
