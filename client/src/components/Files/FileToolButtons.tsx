import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Tooltip from "@mui/material/Tooltip";
import { deleteItem, newFile, newFolder, rename } from "../../util/shell";
import { useContext } from "react";
import { LoadFilesContext } from "./context/FilesContext";
import useToastContext from "../Toast/hooks/useToastContext";

interface Props {
  fileType: "file" | "folder";
  fileName: string;
  visible: boolean;
}

function FileToolButtons({ fileType, fileName, visible }: Props) {
  const { toast } = useToastContext();
  const { loadFiles } = useContext(LoadFilesContext);

  return (
    <div className="fileToolButtons">
      {visible && (
        <>
          <Tooltip title={"rename"} placement="top" arrow>
            <DriveFileRenameOutlineIcon
              onClick={() => rename(fileName, loadFiles, toast)}
              style={{ height: "20px" }}
              className="brightenOnHover"
            />
          </Tooltip>
          <Tooltip title={"delete"} placement="top" arrow>
            <DeleteIcon
              onClick={() => deleteItem(fileName, loadFiles, toast)}
              style={{ height: "20px" }}
              className="brightenOnHover"
            />
          </Tooltip>
          {fileType === "folder" && (
            <>
              <Tooltip title={"new file"} placement="top" arrow>
                <NoteAddIcon
                  onClick={() => newFile(fileName, loadFiles, toast)}
                  style={{ height: "20px" }}
                  className="brightenOnHover"
                />
              </Tooltip>
              <Tooltip title={"new folder"} placement="top" arrow>
                <CreateNewFolderIcon
                  onClick={() => newFolder(fileName, loadFiles, toast)}
                  style={{ height: "20px" }}
                  className="brightenOnHover"
                />
              </Tooltip>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default FileToolButtons;
