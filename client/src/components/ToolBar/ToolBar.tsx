import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import ConstructionIcon from "@mui/icons-material/Construction";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import StopIcon from "@mui/icons-material/Stop";
import InfoIcon from "@mui/icons-material/Info";
import { useContext } from "react";
import NewProjectForm from "../ModalContent/NewProjectForm/NewProjectForm";
import { FileTabContext, FileTabValueContext } from "../../App";
import { compileProject, keyInt, runProject, saveFile } from "../../shell";
import ProjectConfigForm from "../ModalContent/ProjectConfigForm";
import Info from "../ModalContent/Info";
import UserSettingsForm from "../ModalContent/UserSettingsForm/UserSettingsForm";
import ToolBarButton from "./ToolBarButton";
import { ToastContext } from "../Toast/context/ToastContext";
import { LoadFilesContext } from "../Files/context/FilesContext";
import { ModalContext, ModalFunction } from "../Modal/context/ModalContext";
// import useModal from "../Modal/useModal";

interface Props {
  // setModalOpen: (arg0: boolean) => void;
  // setModalChildren: (arg0: ReactNode) => void;
  isFinished: boolean;
  PID: number | undefined;
}

function ToolBar({ isFinished, PID }: Props) {
  const { fileTabValue } = useContext(FileTabValueContext);
  const { tabs } = useContext(FileTabContext);
  const tabIndex = tabs.findIndex((tab) => tab.value === fileTabValue);
  const { useToast } = useContext(ToastContext);
  const { loadFiles } = useContext(LoadFilesContext);
  const { useModal, setOpen } = useContext(ModalContext);

  const handleClickReloadFiles = () => {
    loadFiles();
  };

  const handleClickSave = async () => {
    await saveFile(
      fileTabValue,
      tabs[tabIndex].editorContent,
      undefined,
      useToast
    );
    tabs[tabIndex].editorSaved = true;
  };

  const handleClickCompile = async () => {
    await saveFile(fileTabValue, tabs[tabIndex].editorContent, undefined);
    tabs[tabIndex].editorSaved = true;
    compileProject(fileTabValue, useToast);
  };

  const handleClickRun = () => {
    runProject(fileTabValue, useToast);
  };

  const handleClickStop = () => {
    keyInt(PID);
  };

  const handleClickConfig = (modal: ModalFunction) => {
    // setModalChildren(
    //   <ProjectConfigForm project={fileTabValue} setModalOpen={setOpen} />
    // );
    // setModalOpen(true);
    modal(<ProjectConfigForm project={fileTabValue} setModalOpen={setOpen} />);
  };

  const handleClickSettings = (modal: ModalFunction) => {
    // setModalChildren(<UserSettingsForm />);
    // setModalOpen(true);
    modal(<UserSettingsForm />);
  };

  const handleClickInfo = (modal: ModalFunction) => {
    modal(<Info />);
  };

  const handleClickNewProject = (modal: ModalFunction) => {
    modal(<NewProjectForm setModalOpen={setOpen} />);
  };

  return (
    <div className="toolBar">
      <Stack spacing={2} direction={"row"}>
        <Button
          disableRipple
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            // setModalChildren(<NewProjectForm setModalOpen={setModalOpen} />);
            // setModalOpen(true);
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
