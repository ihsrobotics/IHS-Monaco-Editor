import React, { SetStateAction } from "react";
import { Toast } from "../components/Toast/context/ToastContext";
import { ADDRESS, PORT } from "../env/address";
import useArray from "./hooks/useArray";

export function rename(oldName: string, loadFiles: () => void, toast: Toast) {
  let newName = prompt("new file name: ");
  if (newName == null) {
    return;
  }
  newName = newName.replace(/[^a-zA-Z0-9_-]/g, "");
  newName = oldName.slice(0, oldName.lastIndexOf("/")) + "/" + newName;
  fetch(`http://${ADDRESS}:${PORT}/api/shell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "mv " + oldName + " " + newName }),
  })
    .then((response) => {
      if (response.ok) {
        toast.success("renamed successfully");
      } else {
        toast.error("status " + response.status + " " + response.json());
      }
      loadFiles();
    })
    .catch((error) => {
      toast.error(error);
    });
}

export function deleteItem(name: string, loadFiles: () => void, toast: Toast) {
  if (!confirm("delete " + name + "?")) {
    return;
  }
  fetch(`http://${ADDRESS}:${PORT}/api/shell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "rm -rf " + name }),
  })
    .then((response) => {
      if (response.ok) {
        toast.success("deleted successfully");
      } else {
        toast.error("status " + response.status + " " + response.json());
      }
      loadFiles();
    })
    .catch((error) => {
      toast.error(error);
    });
}

export async function newFile(
  path: string,
  loadFiles?: () => void,
  toast?: Toast,
  newFileName?: string
) {
  let fileName = newFileName ? newFileName : prompt("new file name: ");
  if (fileName == null) {
    return;
  }
  fileName = fileName.replace(/[^a-zA-Z0-9_\-.]/g, "");
  await fetch(`http://${ADDRESS}:${PORT}/api/shell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: "touch " + path + "/" + fileName }),
  })
    .then((response) => {
      if (toast) {
        if (response.ok) toast.success("created successfully");
        else toast.error("status " + response.status + " " + response.json());
      }
      if (loadFiles) loadFiles();
    })
    .catch((error) => {
      if (toast) toast.error(error);
      throw error;
    });
}

export async function newFolder(
  parentDirName: string,
  loadFiles?: () => void,
  toast?: Toast,
  newFolderName?: string
) {
  let folderName = newFolderName ? newFolderName : prompt("new folder name: ");

  if (folderName == null) {
    return;
  }
  folderName = folderName.replace(/[^a-zA-Z0-9_\-.]/g, "");
  await fetch(`http://${ADDRESS}:${PORT}/api/shell`, {
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
        if (response.ok) toast.success("created successfully");
        else toast.error("status " + response.status + " " + response.json());
      }
      if (loadFiles) loadFiles();
    })
    .catch((error) => {
      if (toast) toast.error(error);
      throw error;
    });
}

export async function getFile(path: string) {
  const response = await fetch(
    `http://${ADDRESS}:${PORT}/api/getFile?filename=${path}`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
}

export async function saveFile(
  fileName: string,
  fileContent: string,
  toast?: Toast, 
  setSaved?: () => void
) {
  await fetch(`http://${ADDRESS}:${PORT}/api/saveFile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: fileName, content: fileContent }),
  })
    .then((response) => {
      if (toast) {
        if (response.ok)
          toast.success(
            fileName.split("/").slice(-1).toString() + " saved successfully"
          );
        else toast.error("status " + response.status + " " + response.json());
      }
      if(response.ok && setSaved){
        setSaved();
      }
    })
    .catch((error) => {
      if (toast) toast.error(error);
      throw error;
    });
}

export async function command(
  command: string,
  toast?: Toast,
  successMessage?: string
) {
  try {
    const response = await fetch(`http://${ADDRESS}:${PORT}/api/shell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: command }),
    });
    if (toast && successMessage) {
      if (response.ok) toast.success(successMessage);
      else toast.error("status " + response.status + " " + response.json());
    }
    return response.json();
  } catch (error) {
    if (toast && successMessage) toast.error(error as string);
    throw error;
  }
}

const keyEnterEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  code: "Enter",
  keyCode: 13,
  which: 13,
});

export async function compileProject(project: string, toast: Toast) {
  const config = JSON.parse(
    await getFile(
      project.split("/").slice(0, 2).join("/") + "/.editor/config.json"
    )
  );
  if (config["compile"].trim() === "") {
    toast.error("compile command not set");
    return;
  }
  document.getElementById("terminalInput")!.innerText = config["compile"];
  document.getElementById("terminalInput")!.dispatchEvent(keyEnterEvent);
}

export async function runProject(project: string, toast: Toast) {
  const config = await JSON.parse(
    await getFile(
      project.split("/").slice(0, 2).join("/") + "/.editor/config.json"
    )
  );
  if (config["run"].trim() === "") {
    toast.error("run command not set");
    return;
  }
  document.getElementById("terminalInput")!.innerText = config["run"];
  document.getElementById("terminalInput")!.dispatchEvent(keyEnterEvent);
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
  updateTerminalOutput: React.Dispatch<
    SetStateAction<[string, string, string][]>
  >,
  setCurrentDir: React.Dispatch<string>,
  outputBuffer: string
) {
  const decodedValue = new TextDecoder().decode(value);
  decodedValue.split("\r\n").forEach((value) => {
    const parsedObject = isValidJSON(value);
    // this is the passed back PID
    if (parsedObject !== null && parsedObject["pid"] != undefined) {
      // console.log("pid found:", parsedObject["pid"]);
      setPID(Number.parseInt(parsedObject["pid"]) + 1);
    }
    // this is the passed back new path
    else if (parsedObject !== null && parsedObject["path"] != undefined) {
      // console.log("path found:", parsedObject["path"]);
      if (parsedObject.path !== "invalid") setCurrentDir(parsedObject["path"]);
    }
    // this is regular output
    else if (value !== "") {
      // console.log("regular value:", value);
      outputBuffer += value.substring(1, value.length - 1);

      updateTerminalOutput([
        ...oldTerminalOutput,
        [...(newTerminalOutput.slice(0, 2) as [string, string]), outputBuffer],
      ]);

      document.querySelector(".app-bottomBar-content")!.scrollTop =
        document.querySelector(".app-bottomBar-content")!.scrollHeight;
    }
  });
  return outputBuffer;
}

export async function liveShell(
  command: string,
  cwd: string,
  setPID: React.Dispatch<number>,
  setIsFinished: React.Dispatch<boolean>,
  terminalOutputArray: ReturnType<typeof useArray<[string, string, string]>>,
  newTerminalOutput: [string, string, string],
  setCurrentDir: React.Dispatch<SetStateAction<string>>,
  terminalInputRef: React.RefObject<HTMLDivElement>
) {
  const response = await fetch(`http://${ADDRESS}:${PORT}/api/liveShell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: command, cwd: cwd }),
  });
  const reader = response.body?.getReader();
  let output = "";

  const oldTerminalOutput = terminalOutputArray.array;

  const { done, value } =
    (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;
  output = readShellOutput(
    value,
    setPID,
    oldTerminalOutput,
    newTerminalOutput,
    terminalOutputArray.setArray,
    setCurrentDir,
    output
  );
  while (!done) {
    const { done, value } =
      (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;

    if (done) {
      setIsFinished(true);
      // wait for the rerender to finish before setting the focus
      setTimeout(() => {
        terminalInputRef.current?.focus();
      }, 100);
      break;
    }
    output = readShellOutput(
      value,
      setPID,
      oldTerminalOutput,
      newTerminalOutput,
      terminalOutputArray.setArray,
      setCurrentDir,
      output
    );
  }
}

export function keyInt(pid: number | undefined) {
  if (pid == undefined) return;
  fetch(`http://${ADDRESS}:${PORT}/api/kill`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pid: pid }),
  });
}
