import { MouseEvent, useContext, useEffect, useState } from "react";

import BranchExtension from "../../assets/branches/branchExtension.svg";
import { getFile } from "../../util/shell";

import { FileTabContext, FileTabValueContext } from "../../App";
import CodeEditor from "../Editor/CodeEditor";
import FileName from "./FileName";
import FileToolButtons from "./FileToolButtons";

interface Props {
  name: string;
  depth: number;
}
// name conflict with some random thing
function FileComponent({ name, depth }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (window.getComputedStyle(e.currentTarget).cursor == "col-resize") {
      e.currentTarget.classList.remove("hoverEffect");
    } else {
      e.currentTarget.classList.add("hoverEffect");
    }
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      setIsShiftPressed(true);
    }
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (!e.shiftKey) {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const { tabs } = useContext(FileTabContext);
  const { setFileTabValue } = useContext(FileTabValueContext);

  const handleClick = async () => {
    // this file is already open
    if (tabs.some((tab) => tab.value === name)) {
      setFileTabValue(name);
      return;
    }

    tabs.push({
      id: name,
      label: name.split("/").slice(-1).toString(),
      value: name,
      content: <CodeEditor fileName={name} content={getFile(name)} />,
      editorContent: "",
      editorSaved: true,
    });
    setFileTabValue(name);
  };

  return (
    <div
      className="file"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span
        className="fileName"
        style={{ paddingLeft: 2 * depth * 12 + "px", height: "24px" }}
      >
        <img
          src={BranchExtension}
          alt=""
          style={{
            flexShrink: "0",
            marginLeft: "-5px",
            width: "29px",
            height: "24px",
          }}
        />
        <FileName fileName={name.split("/").slice(-1).toString()} />
        <FileToolButtons
          fileType="file"
          fileName={name}
          visible={isHovered && isShiftPressed}
        />
      </span>
    </div>
  );
}

export default FileComponent;
