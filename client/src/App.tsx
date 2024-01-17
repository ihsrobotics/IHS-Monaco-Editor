import { useEffect, useState, ReactNode } from "react";
import SideBar from "./components/SideBar";
import "./App.css"
import FileListing from "./components/FileListing";

import { AlertColor, ThemeProvider, createTheme } from "@mui/material";

import React from "react";
import Toast from "./components/Toast";
import ToolBar from "./components/ToolBar";
import SmoothModal from "./components/SmoothModal";
import EditorTabs, { tab } from "./components/EditorTabs";
import BottomBar from "./components/BottomBar";
import Terminal from "./components/Terminal";


// export const FileUpdateContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([true, () => null]);
export const FileUpdateContext = React.createContext<{fileUpdateFlag: boolean, setFileUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>}>({fileUpdateFlag: true, setFileUpdateFlag: () => null});


export type ToastProps = {
  open: boolean;
  severity: AlertColor;
  message: string;
};

export const ToastContext = React.createContext<{ToastProps: ToastProps, setToastProps: React.Dispatch<React.SetStateAction<ToastProps>>}>({ToastProps: {open: false, severity: 'success', message: ''}, setToastProps: () => null});

export const FileTabContext = React.createContext<{tabs: tab[], setTabs: React.Dispatch<React.SetStateAction<tab[]>>}>({tabs: [{id: '', label: '', value: '', content: '', editorContent: '', editorSaved: true}], setTabs: () => null});
export const FileTabValueContext = React.createContext<{fileTabValue: string, setFileTabValue: React.Dispatch<React.SetStateAction<string>>}>({fileTabValue: '', setFileTabValue: () => null});
export const ReloadEditorContext = React.createContext<{reloadEditorFlag: boolean, setReloadEditorFlag: React.Dispatch<React.SetStateAction<boolean>>}>({reloadEditorFlag: false, setReloadEditorFlag: () => null});

export const ReloadToolBarContext = React.createContext<{reloadToolBarFlag: boolean, setReloadToolBarFlag: React.Dispatch<React.SetStateAction<boolean>>}>({reloadToolBarFlag: false, setReloadToolBarFlag: () => null});

export const userSettingsContext = React.createContext<{ligatures: boolean, setLigatures: React.Dispatch<React.SetStateAction<boolean>>, editorTheme: boolean, setEditorTheme: React.Dispatch<React.SetStateAction<boolean>>, smoothCursorBlink: boolean, setSmoothCursorBlink: React.Dispatch<React.SetStateAction<boolean>>, smoothCaretAnimation: boolean, setSmoothCaretAnimation: React.Dispatch<React.SetStateAction<boolean>>, minimap: boolean, setMinimap: React.Dispatch<React.SetStateAction<boolean>>, saveFileOnFileChange: boolean, setSaveFileOnFileChange: React.Dispatch<React.SetStateAction<boolean>>, saveFileOnEditorClose: boolean, setSaveFileOnEditorClose: React.Dispatch<React.SetStateAction<boolean>>, showEditorConfigFolder: boolean, setShowEditorConfigFolder: React.Dispatch<React.SetStateAction<boolean>>, pythonIntellisense: boolean, setPythonIntellisense: React.Dispatch<React.SetStateAction<boolean>>, cppIntellisense: boolean, setCppIntellisense: React.Dispatch<React.SetStateAction<boolean>>, saveButtonSaveProject: boolean, setSaveButtonSaveProject: React.Dispatch<React.SetStateAction<boolean>>}>({ligatures: true, setLigatures: () => null, editorTheme: true, setEditorTheme: () => null, smoothCursorBlink: true, setSmoothCursorBlink: () => null, smoothCaretAnimation: true, setSmoothCaretAnimation: () => null, minimap: true, setMinimap: () => null, saveFileOnFileChange: false, setSaveFileOnFileChange: () => null, saveFileOnEditorClose: true, setSaveFileOnEditorClose: () => null, showEditorConfigFolder: false, setShowEditorConfigFolder: () => null, pythonIntellisense: false, setPythonIntellisense: () => null, cppIntellisense: false, setCppIntellisense: () => null, saveButtonSaveProject: false, setSaveButtonSaveProject: () => null});

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const zeroSidebarWidth = 75, minSidebarWidth = 200;

  const [fileUpdateFlag, setFileUpdateFlag] = useState(false);

  const [projects, setProjects] = useState<object>({});

  const [toast, setToast] = useState<ToastProps>({
    open: false,
    severity: "success",
    message: ""
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<ReactNode>("");

  const [tabs, setTabs] = useState<tab[]>([]);
  const [fileTabValue, setFileTabValue] = React.useState("");
  const [reloadEditorFlag, setReloadEditorFlag] = React.useState(false);

  const [reloadToolBarFlag, setReloadToolBarFlag] = React.useState(false);

  const [isFinished, setIsFinished] = useState(true);
  const [PID, setPID] = useState<number>();

  // user settings
  const [ligatures, setLigatures] = useState<boolean>(true);
  const [editorTheme, setEditorTheme] = useState<boolean>(true);
  const [smoothCursorBlink, setSmoothCursorBlink] = useState<boolean>(true);
  const [smoothCaretAnimation, setSmoothCaretAnimation] = useState<boolean>(true);
  const [minimap, setMinimap] = useState<boolean>(true);
  const [saveFileOnFileChange, setSaveFileOnFileChange] = useState<boolean>(false);
  const [saveFileOnEditorClose, setSaveFileOnEditorClose] = useState<boolean>(true);
  const [showEditorConfigFolder, setShowEditorConfigFolder] = useState<boolean>(false);
  const [pythonIntellisense, setPythonIntellisense] = useState<boolean>(false);
  const [cppIntellisense, setCppIntellisense] = useState<boolean>(false);
  const [saveButtonSaveProject, setSaveButtonSaveProject] = useState<boolean>(false);

  useEffect(() => {
    // clear the current projects
    console.log("new fetch");
    setProjects({});
    fetch('http://localhost:5000/api/getFileHierarchy', {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => { setProjects(data) }
    );
  }, [fileUpdateFlag]);

  useEffect(() => {
    const savedLigatures = localStorage.getItem('ligatures');
    const savedEditorTheme = localStorage.getItem('editorTheme');
    const savedSmoothCursorBlink = localStorage.getItem('smoothCursorBlink');
    const savedSmoothCaretAnimation = localStorage.getItem('smoothCaretAnimation');
    const savedMinimap = localStorage.getItem('minimap');
    const savedSaveFileOnFileChange = localStorage.getItem('saveFileOnFileChange');
    const savedSaveFileOnEditorClose = localStorage.getItem('saveFileOnEditorClose');
    const savedShowEditorConfigFolder = localStorage.getItem('showEditorConfigFolder');
    const savedPythonIntellisense = localStorage.getItem('pythonIntellisense');
    const savedCppIntellisense = localStorage.getItem('cppIntellisense');
    const savedSaveButtonSaveProject = localStorage.getItem('saveButtonSaveProject');
    
    if(savedLigatures) setLigatures(savedLigatures==='true');
    if(savedEditorTheme) setEditorTheme(savedEditorTheme==='true');
    if(savedSmoothCursorBlink) setSmoothCursorBlink(savedSmoothCursorBlink==='true');
    if(savedSmoothCaretAnimation) setSmoothCaretAnimation(savedSmoothCaretAnimation==='true');
    if(savedMinimap) setMinimap(savedMinimap==='true');
    if(savedSaveFileOnFileChange) setSaveFileOnFileChange(savedSaveFileOnFileChange==='true');
    if(savedSaveFileOnEditorClose) setSaveFileOnEditorClose(savedSaveFileOnEditorClose==='true');
    if(savedShowEditorConfigFolder) setShowEditorConfigFolder(savedShowEditorConfigFolder==='true');
    if(savedPythonIntellisense) setPythonIntellisense(savedPythonIntellisense==='true');
    if(savedCppIntellisense) setCppIntellisense(savedCppIntellisense==='true');
    if(savedSaveButtonSaveProject) setSaveButtonSaveProject(savedSaveButtonSaveProject==='true');
  }, [])


  const THEME = createTheme({
    typography: {
      fontFamily: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Noto Sans", "Liberation Sans", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"].join(','),
      fontSize: 16,
      body1: {
        fontFamily: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Noto Sans", "Liberation Sans", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"].join(','),
        fontSize: 16,
      }
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#BFC6C8'
      }

    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiTab: {
        defaultProps: {
          disableFocusRipple: true,
        }
      },
    }
  });




  return (
    <>
      <ThemeProvider theme={THEME}>
        <userSettingsContext.Provider value={{ligatures: ligatures, setLigatures: setLigatures, editorTheme: editorTheme, setEditorTheme: setEditorTheme, smoothCursorBlink: smoothCursorBlink, setSmoothCursorBlink: setSmoothCursorBlink, smoothCaretAnimation: smoothCaretAnimation, setSmoothCaretAnimation: setSmoothCaretAnimation, minimap: minimap, setMinimap: setMinimap, saveFileOnFileChange: saveFileOnFileChange, setSaveFileOnFileChange: setSaveFileOnFileChange, saveFileOnEditorClose: saveFileOnEditorClose, setSaveFileOnEditorClose: setSaveFileOnEditorClose, showEditorConfigFolder: showEditorConfigFolder, setShowEditorConfigFolder: setShowEditorConfigFolder, pythonIntellisense: pythonIntellisense, setPythonIntellisense: setPythonIntellisense, cppIntellisense: cppIntellisense, setCppIntellisense: setCppIntellisense, saveButtonSaveProject: saveButtonSaveProject, setSaveButtonSaveProject: setSaveButtonSaveProject}}>
        <ToastContext.Provider value={{ToastProps: toast, setToastProps: setToast}}>
        <FileTabContext.Provider value={{tabs: tabs, setTabs: setTabs}}>
        <FileTabValueContext.Provider value={{fileTabValue: fileTabValue, setFileTabValue: setFileTabValue}}>
        <ReloadEditorContext.Provider value={{ reloadEditorFlag: reloadEditorFlag, setReloadEditorFlag }}>
        <ReloadToolBarContext.Provider value={{ reloadToolBarFlag: reloadToolBarFlag, setReloadToolBarFlag: setReloadToolBarFlag }}>
        <FileUpdateContext.Provider value={{fileUpdateFlag: fileUpdateFlag, setFileUpdateFlag: setFileUpdateFlag}}>

          <ToolBar setModalOpen={setModalOpen} setModalChildren={setModalChildren} isFinished={isFinished} PID={PID} />
          <div className="appContainer">
            <SideBar width={sidebarWidth} widthUpdateFunction={setSidebarWidth} zeroSidebarWidth={zeroSidebarWidth} minSidebarWidth={minSidebarWidth}>
              {
              Object.keys(projects).length === 0 ? <p>Loading...</p> : 
                  <FileListing files={projects}/>
              }
            </SideBar>
            <div className="rightSide" style={{ width: "calc(100% - "+(sidebarWidth > minSidebarWidth ? sidebarWidth : sidebarWidth > zeroSidebarWidth ? minSidebarWidth : 0)+"px)" }}>
              <EditorTabs/>
              <BottomBar 
                children={<Terminal isFinished={isFinished} setIsFinished={setIsFinished} PID={PID} setPID={setPID} />} 
                isFinished={isFinished} 
                width={"calc(100% - "+(sidebarWidth > minSidebarWidth ? sidebarWidth : sidebarWidth > zeroSidebarWidth ? minSidebarWidth : 0)+"px)"}
              />
            </div>
          </div>
          <Toast open={toast['open']} severity={toast['severity']} message={toast['message']} setOpen={setToast}/>
          <SmoothModal open={modalOpen} setOpen={setModalOpen} children={modalChildren}/>
        </FileUpdateContext.Provider>
        </ReloadToolBarContext.Provider>
        </ReloadEditorContext.Provider>
        </FileTabValueContext.Provider>
        </FileTabContext.Provider>
        </ToastContext.Provider>
        </userSettingsContext.Provider>
      </ThemeProvider>

    </>
  ) 
}

export default App;
