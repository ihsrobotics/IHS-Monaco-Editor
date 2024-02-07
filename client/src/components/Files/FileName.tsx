import { fileIcons } from "./FileIcons";
import NotesIcon from "@mui/icons-material/Notes";
import FolderIcon from "@mui/icons-material/Folder";

interface Props {
  fileName: string;
  folder?: boolean;
}

function FileName({ fileName, folder = false }: Props) {
  const fileExtension: string =
    fileName.split(".").length > 1 ? fileName.split(".").pop()! : "";
  return (
    <span className="fileLabel">
      {folder ? (
        <FolderIcon style={{ height: "20px", width: "24px" }} />
      ) : fileExtension in fileIcons ? (
        <img
          src={fileIcons[fileExtension]}
          alt=""
          style={{ height: "20px", width: "20px", marginRight: "4px" }}
        />
      ) : (
        <NotesIcon style={{ height: "20px", width: "24px" }} />
      )}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', minWidth: '0', height: "24px" }}>{fileName.split("/").slice(-1).toString()}{" "}</span>
    </span>
  );
}

export default FileName;
