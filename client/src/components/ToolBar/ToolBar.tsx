import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import ConstructionIcon from "@mui/icons-material/Construction";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import StopIcon from "@mui/icons-material/Stop";
import InfoIcon from "@mui/icons-material/Info";
import { useContext } from "react";
import NewProjectForm from "../ModalContent/NewProjectForm/NewProjectForm";
import { compileProject, keyInt, runProject, saveFile } from "../../util/shell";
import ProjectConfigForm from "../ModalContent/ProjectConfigForm";
import Info from "../ModalContent/Info";
import UserSettingsForm from "../ModalContent/UserSettingsForm/UserSettingsForm";
import ToolBarButton from "./ToolBarButton";
import { LoadFilesContext } from "../Files/context/FilesContext";
import { ModalContext, ModalFunction } from "../Modal/context/ModalContext";
import useToastContext from "../Toast/hooks/useToastContext";
import useEditorTabsContext from "../EditorTabs/hooks/useEditorTabsContext";
import { ADDRESS, PORT } from "../../env/address";

interface Props {
  isFinished: boolean;
  PID: number | undefined;
}

function ToolBar({ isFinished, PID }: Props) {
  const {
    editorTabs: { array: tabs },
    selectedTabValue,
  } = useEditorTabsContext();

  const tabIndex = tabs.findIndex((tab) => tab.value === selectedTabValue);
  const { toast } = useToastContext();
  const { loadFiles } = useContext(LoadFilesContext);
  const { useModal, setOpen } = useContext(ModalContext);

  const handleClickReloadFiles = () => {
    loadFiles();
  };

  const handleClickSave = async () => {
    await saveFile(
      selectedTabValue,
      tabs[tabIndex].editorContent,
      undefined,
      toast
    );
    tabs[tabIndex].editorSaved = true;
  };

  const handleClickCompile = async () => {
    await saveFile(selectedTabValue, tabs[tabIndex].editorContent, undefined);
    tabs[tabIndex].editorSaved = true;
    compileProject(selectedTabValue, toast);
  };

  const handleClickRun = () => {
    runProject(selectedTabValue, toast);
  };

  const handleClickStop = () => {
    keyInt(PID);
  };

  const handleClickConfig = (modal: ModalFunction) => {
    modal(
      <ProjectConfigForm project={selectedTabValue} setModalOpen={setOpen} />
    );
  };

  const handleClickSettings = (modal: ModalFunction) => {
    modal(<UserSettingsForm />);
  };

  const handleClickInfo = (modal: ModalFunction) => {
    modal(<Info />);
  };

  const handleClickNewProject = (modal: ModalFunction) => {
    modal(<NewProjectForm setModalOpen={setOpen} />);
  };

  const handleClickDownload = () => {

    const folderName = selectedTabValue.split("/").slice(1, 2).join("/");
    fetch(`http://${ADDRESS}:${PORT}/api/downloadProject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectName: folderName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error('Error downloading project' + response.status)
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${folderName}`;
        document.body.append(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="toolBar">
      <Stack spacing={2} direction={"row"}>
        <Button
          disableRipple
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            handleClickNewProject(useModal);
          }}
        >
          New Project
        </Button>
        <ToolBarButton
          name="reload files"
          handleClick={handleClickReloadFiles}
          icon={<ReplayIcon />}
        />
      </Stack>

      <Stack spacing={6} direction={"row"}>
        <Stack spacing={2} direction={"row"}>
          <ToolBarButton
            name="download project"
            handleClick={handleClickDownload}
            disabled={!tabs[tabIndex]}
            icon={<DownloadIcon />}
          />
          <ToolBarButton
            name="save file"
            color={
              !tabs[tabIndex]
                ? "primary"
                : tabs[tabIndex].editorSaved
                ? "success"
                : "error"
            }
            handleClick={handleClickSave}
            disabled={!tabs[tabIndex]}
            icon={<SaveIcon />}
          />
          <ToolBarButton
            name="save file + compile project"
            handleClick={handleClickCompile}
            disabled={!tabs[tabIndex] || !isFinished}
            icon={<TextSnippetIcon />}
          />
          <ToolBarButton
            name="run project"
            handleClick={handleClickRun}
            disabled={!tabs[tabIndex] || !isFinished}
            icon={<PlayArrowIcon />}
            visible={isFinished}
          />
          <ToolBarButton
            name="stop project"
            handleClick={handleClickStop}
            color="error"
            disabled={!tabs[tabIndex]}
            icon={<StopIcon />}
            visible={!isFinished}
          />
        </Stack>
        <Stack spacing={0.5} direction={"row"}>
          <ToolBarButton
            name="configure project"
            handleClick={() => handleClickConfig(useModal)}
            disabled={!tabs[tabIndex]}
            icon={<ConstructionIcon />}
          />
          <ToolBarButton
            name="settings"
            handleClick={() => handleClickSettings(useModal)}
            icon={<SettingsIcon />}
          />
          <ToolBarButton
            name="info"
            handleClick={() => handleClickInfo(useModal)}
            icon={<InfoIcon />}
          />
        </Stack>
      </Stack>
    </div>
  );
}

export default ToolBar;
