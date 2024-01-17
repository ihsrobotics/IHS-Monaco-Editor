import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Stack from "@mui/material/Stack";
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { ReactNode, useContext, useEffect, useState } from "react";
import NewProjectForm from "./NewProjectForm";
import { FileTabContext, FileTabValueContext, ReloadToolBarContext, ToastContext } from "../App";
import { compileProject, keyInt, runProject, saveFile } from "../shell";
import ProjectConfigForm from "./ProjectConfigForm";
import Info from "./Info";
import UserSettingsForm from "./UserSettingsForm";

interface Props{
    setModalOpen: (arg0: boolean) => void,
    setModalChildren: (arg0: ReactNode) => void,
    isFinished: boolean,
    PID: number | undefined,
}



function ToolBar({ setModalOpen, setModalChildren, isFinished, PID }: Props){
    const {fileTabValue} = useContext(FileTabValueContext);
    const {tabs} = useContext(FileTabContext);
    const {setToastProps} = useContext(ToastContext);
    const tabIndex = tabs.findIndex(tab => tab.value === fileTabValue);

    const { reloadToolBarFlag, setReloadToolBarFlag } = useContext(ReloadToolBarContext);

    const [baseDir, setBaseDir] = useState('');

    useEffect(() => {
    }, [reloadToolBarFlag]);

    useEffect(() => {
      fetch('http://localhost:5000/api/getPath', {method: 'GET'}).then(
        response => response.json()
      ).then(
        data => { setBaseDir(data['path']) }
      );
    }, []);

    return (
        <div className="toolBar">
            <Button disableRipple variant="outlined" startIcon={<AddIcon/>}  onClick={() => {setModalChildren(<NewProjectForm setModalOpen={setModalOpen}/>); setModalOpen(true)}}>New Project</Button>
            <Stack spacing={6} direction={"row"}>
              <Stack spacing={2} direction={"row"}>
                <Tooltip title={"save file"} arrow>
                  <span>
                    <Button disableRipple variant="outlined" color={ !tabs[tabIndex] ? 'primary' : tabs[tabIndex].editorSaved ? "success" : "error"} onClick={async () =>  { await saveFile(fileTabValue, tabs[tabIndex].editorContent, setToastProps); tabs[tabIndex].editorSaved=true; setReloadToolBarFlag(!reloadToolBarFlag)} } disabled={!tabs[tabIndex]}> <SaveIcon/> </Button>
                  </span>
                </Tooltip>
                <Tooltip title={"save file + compile project"} arrow>
                  <span>
                    <Button disableRipple variant="outlined" onClick={async () => {await saveFile(fileTabValue, tabs[tabIndex].editorContent, undefined); tabs[tabIndex].editorSaved=true; setReloadToolBarFlag(!reloadToolBarFlag); compileProject(baseDir, fileTabValue, setToastProps)}} disabled={!tabs[tabIndex] || !isFinished}> <TextSnippetIcon/> </Button>
                  </span>
                </Tooltip>
                <Tooltip title={"run project"} arrow>
                  <span>
                    <Button disableRipple variant="outlined" onClick={() => runProject(baseDir, fileTabValue, setToastProps)} disabled={!tabs[tabIndex] || !isFinished} style={{ display: isFinished ? '' : 'none' }}> <PlayArrowIcon/> </Button>
                  </span>
                </Tooltip>
                <Tooltip title={"stop project"} arrow>
                  <span>
                    <Button disableRipple color="error" variant="outlined" onClick={() => keyInt(PID)} disabled={!tabs[tabIndex]} style={{ display: isFinished ? 'none' : '' }}> <StopIcon /> </Button>
                  </span>
                </Tooltip>
              </Stack>
              <Stack spacing={0.5} direction={"row"}>
                <Tooltip title={"configure project"} arrow>
                  <span>
                    <Button disableRipple variant="outlined" onClick={() => {setModalChildren(<ProjectConfigForm project={fileTabValue} setModalOpen={setModalOpen}/>); setModalOpen(true)}} disabled={!tabs[tabIndex]}> <ConstructionIcon/> </Button>
                  </span>
                </Tooltip>
                <Tooltip title={"settings"} arrow>
                  <Button disableRipple variant="outlined" onClick={() => {setModalChildren(<UserSettingsForm/>); setModalOpen(true)}}> <SettingsIcon/> </Button>
                </Tooltip>
                <Tooltip title={"info"} arrow>
                  <Button disableRipple variant="outlined" onClick={() => {setModalChildren(<Info/>); setModalOpen(true)}}> <InfoIcon/> </Button>
                </Tooltip>
              </Stack>
            </Stack>
            
          </div>
    )
}

export default ToolBar;