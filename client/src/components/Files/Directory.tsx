import { ReactElement, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileToolButtons from "./FileToolButtons";
import FileName from "./FileName";
import useBranches from "./hooks/useBranches";
import Branches from "./Branches";
import useFileTools from "./hooks/useFileTools";

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
  const {isShiftPressed, isHovered, handleMouseEnter, handleMouseLeave} = useFileTools();

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