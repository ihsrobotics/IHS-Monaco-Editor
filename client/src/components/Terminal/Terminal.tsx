import { useEffect, useState } from "react";
import "./styles/Terminal.css";
import path from "path-browserify";
import { keyInt, liveShell } from "../../shell";
import { ADDRESS } from "../../address";
import useArray from "../../hooks/useArray";


interface Props {
  isFinished: boolean;
  setIsFinished: (arg0: boolean) => void;
  PID: number | undefined;
  setPID: (arg0: number) => void;
}

function Terminal({ isFinished, setIsFinished, PID, setPID}: Props) {
  const terminalCommands = useArray<[string, string, string]>([]);
  const [home, setHome] = useState("");
  const [currentDir, setCurrentDir] = useState("");  
  const [user, setUser] = useState("");

  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [isTerminalLoaded, setIsTerminalLoaded] = useState(false);
  // const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const commandHistory = useArray<string>([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(0);

  const createPrompt = (pwd: string) => {
    return (
      <>
        <strong>
          <span className="user">{user}</span>:
          <span className="path">
            {pwd.includes(home) ? "~/" + path.relative(home, pwd) : pwd}
          </span>
        </strong>
        
        $&nbsp;
      </>
    );
  };

  const createCommand = (
    [pwd, command, response]: [string, string, string],
    index: number
  ) => {
    return (
      <>
        <div key={index}>
          {createPrompt(pwd)}
          <span>{command}</span>
        </div>
        <div className="response">
          {response.split(String.raw`\n`).map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </>
    );
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      // remove ascii 10
      const input = (e.target as HTMLDivElement).innerText.replace(/\n/g, "");

      // handle clear
      if (input === "clear") {
        terminalCommands.setArray([]);
        commandHistory.push(input);
        setCommandHistoryIndex(commandHistory.array.length + 1);
        (e.target as HTMLDivElement).innerText = "";
        return;
      }

      // handle commands
      if (input.trim().length > 0) {
        console.log("command:", input);
        // setCommandHistory([...commandHistory, input]);
        commandHistory.push(input);
        setCommandHistoryIndex(commandHistory.array.length + 1);
        terminalCommands.push([currentDir, input, ""]);
        setIsFinished(false);
        liveShell(
          input,
          currentDir,
          setPID,
          setIsFinished,
          terminalCommands.array,
          [currentDir, input, ""],
          terminalCommands.setArray,
          setCurrentDir
        );
      }

      // empty command
      else {
        terminalCommands.push([currentDir, input, '']);
      }

      // clear the input box
      (e.target as HTMLDivElement).innerText = "";
      document.querySelector(".app-bottomBar-content")!.scrollTop =
        document.querySelector(".app-bottomBar-content")!.scrollHeight;
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      if(commandHistory.array[commandHistoryIndex - 1]){
        (e.target as HTMLDivElement).innerText = commandHistory.array[commandHistoryIndex - 1];
        setCommandHistoryIndex(commandHistoryIndex - 1);
      }
      setCurrentCommand((e.target as HTMLDivElement).innerText);
    } else if (e.key == "ArrowDown") {
      e.preventDefault();
      if(commandHistory.array[commandHistoryIndex + 1]){
        (e.target as HTMLDivElement).innerText = commandHistory.array[commandHistoryIndex + 1];
        setCommandHistoryIndex(commandHistoryIndex + 1)
      }
      else{
        (e.target as HTMLDivElement).innerText = currentCommand;
        setCommandHistoryIndex(
            commandHistoryIndex < commandHistory.array.length
              ? commandHistoryIndex + 1
              : commandHistory.array.length
        )
      }
    } 
    // else if (e.key == "Control") {
    //   console.log(currentDir);
    //   console.log(terminalCommands);
    // } 
    // else {
    //   setCurrentCommand(
    //     (e.target as HTMLDivElement).innerText.replace(/\n/g, "") +
    //       (e.key.length === 1 ? e.key : "")
    //   );
    // }
  };
  // special control + c behavior
  const handleWindowKeyDown = (e: KeyboardEvent) => {
    // keyboard interrupt
    if (e.ctrlKey && e.code === "KeyC" && !isFinished) {
      e.preventDefault();
      console.log("keyint", PID);
      keyInt(PID);
    }
    // alternate copy
    else if (e.shiftKey && e.ctrlKey && e.code === "KeyC") {
      console.log("shift copy");
      e.preventDefault();
      copySelectedText();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleWindowKeyDown);
    document.getElementById("terminalInput")?.addEventListener("keydown", handleKeyDown);
    if (!isTerminalLoaded)
      fetch("http://" + ADDRESS + ":5000/api/getPath", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setCurrentDir(data["path"]);
          setHome(data["home"]);
          setUser(data["user"]);
          setIsTerminalLoaded(true);
        });

    return () => {
      document.removeEventListener("keydown", handleWindowKeyDown);
      document
        .getElementById("terminalInput")
        ?.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      {terminalCommands.array.map((command, index) => createCommand(command, index))}

      <div
        className="currentCommand"
        onClick={() => document.getElementById("terminalInput")?.focus()}
        style={{ visibility: isFinished ? "visible" : "hidden" }}
      >
        {createPrompt(currentDir)}
        <div contentEditable="true" id="terminalInput" spellCheck={"false"} />
      </div>
    </div>
  );
}

export default Terminal;

function copySelectedText() {
  const selectedText = window.getSelection()?.toString();
  if (selectedText) {
    navigator.clipboard.writeText(selectedText);
  }
}
