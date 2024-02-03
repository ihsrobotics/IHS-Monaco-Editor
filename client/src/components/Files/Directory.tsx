import { ReactElement, useEffect, useState, MouseEvent } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileToolButtons from "./FileToolButtons";
import FileName from "./FileName";
import useBranches from "./hooks/useBranches";
import Branches from "./Branches";

interface Props {
  name: string;
  depth: number;
  isOpened?: boolean;
  children: ReactElement;
}

function Directory({ name, depth, children }: Props) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
  };

  const { branchArray, updateBranches } = useBranches();

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

  return (
    <div
      className="directory"
      data-opened={opened}
      onClick={
        () =>
          setTimeout(() => {
            updateBranches(name);
          }, 10)
        // the set timeout is so that the 'data-opened' attribute has time to update before updating the branches
      }
      data-name={name}
    >
      <div
        className="directoryName"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          onClick={handleClick}
          className="fileName"
          style={{ paddingLeft: 2 * depth * 12 + "px" }}
        >
          {opened ? (
            <KeyboardArrowDownIcon style={{ height: "24px", width: "24px" }} />
          ) : (
            <ChevronRightIcon style={{ height: "24px", width: "24px" }} />
          )}
          <FileName fileName={name.split("/").slice(-1).toString()} folder />
        </span>
        <FileToolButtons
          fileType="folder"
          fileName={name}
          visible={isHovered && isShiftPressed}
        />
      </div>

      {opened && <Branches branchArray={branchArray} depth={depth} />}

      {children}
    </div>
  );
}

export default Directory;
