import { useEffect, useRef, useState } from "react";
import "./styles/Terminal.css";
import path from "path-browserify";
import { keyInt, liveShell } from "../../util/shell";
// import { ADDRESS, PORT } from "../../env/address";
import useArray from "../../util/hooks/useArray";
import useTerminalUser from "./useTerminalUser";

interface Props {
  isFinished: boolean;
  setIsFinished: (arg0: boolean) => void;
  PID: number | undefined;
  setPID: (arg0: number) => void;
}

function Terminal({ isFinished, setIsFinished, PID, setPID }: Props) {
  // [path, command, response]
  const terminalCommands = useArray<[string, string, string]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");

  const { user, home, currentDir, setCurrentDir } = useTerminalUser();

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
        setCommandHistoryIndex(commandHistory.length + 1);
        (e.target as HTMLDivElement).innerText = "";
        return;
      }

      // handle commands
      if (input.trim().length > 0) {
        commandHistory.push(input);
        setCommandHistoryIndex(commandHistory.length + 1);
        terminalCommands.push([currentDir, input, ""]);
        setIsFinished(false);
        liveShell(
          input,
          currentDir,
          setPID,
          setIsFinished,
          terminalCommands,
          [currentDir, input, ""],
          setCurrentDir,
          terminalInputRef
        );
      }

      // empty command
      else {
        terminalCommands.push([currentDir, input, ""]);
      }

      // clear the input box
      (e.target as HTMLDivElement).innerText = "";
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      // if an older command exists
      if (commandHistory.array[commandHistoryIndex - 1]) {
        (e.target as HTMLDivElement).innerText =
          commandHistory.array[commandHistoryIndex - 1];
        setCommandHistoryIndex(commandHistoryIndex - 1);
      }
      // cache the current command in case the user presses arrow down to go back to most recent command content
      setCurrentCommand((e.target as HTMLDivElement).innerText);
    } else if (e.key == "ArrowDown") {
      e.preventDefault();
      // there is a more recent command
      if (commandHistory.array[commandHistoryIndex + 1]) {
        (e.target as HTMLDivElement).innerText =
          commandHistory.array[commandHistoryIndex + 1];
        setCommandHistoryIndex(commandHistoryIndex + 1);
      } else {
        // there isn't a more recent command
        (e.target as HTMLDivElement).innerText = currentCommand;
        setCommandHistoryIndex(
          commandHistoryIndex < commandHistory.length
            ? commandHistoryIndex + 1
            : commandHistory.length
        );
      }
    }
    // else if (e.key == "Control") {
    //   console.log(currentDir);
    //   console.log(terminalCommands);
    // }
  };
  // special control + c behavior
  const handleWindowKeyDown = (e: KeyboardEvent) => {
    // keyboard interrupt
    if (e.ctrlKey && e.code === "KeyC" && !isFinished) {
      e.preventDefault();
      keyInt(PID);
    }
    // alternate copy
    else if (e.shiftKey && e.ctrlKey && e.code === "KeyC") {
      e.preventDefault();
      copySelectedText();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleWindowKeyDown);
    document
      .getElementById("terminalInput")
      ?.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleWindowKeyDown);
      document
        .getElementById("terminalInput")
        ?.removeEventListener("keydown", handleKeyDown);
    };
  });

  const terminalInputRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {terminalCommands.array.map((command, index) =>
        createCommand(command, index)
      )}

      <div
        className="currentCommand"
        onClick={() => terminalInputRef.current?.focus()}
        style={{ visibility: isFinished ? "visible" : "hidden" }}
      >
        {createPrompt(currentDir)}
        <div
          contentEditable="true"
          id="terminalInput"
          spellCheck={"false"}
          ref={terminalInputRef}
        />
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
