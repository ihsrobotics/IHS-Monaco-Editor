import { useState } from "react";
import SideBar from "./components/Files/SideBar";
import "./App.css";
import FileListing from "./components/Files/FileListing";

import React from "react";
import ToolBar from "./components/ToolBar/ToolBar";
import EditorTabs, { tab } from "./components/Editor/EditorTabs";
import BottomBar from "./components/Terminal/BottomBar";
import Terminal from "./components/Terminal/Terminal";
import Theme from "./Theme";
import ToastContext from "./components/Toast/ToastContext";
import LoadFilesProvider from "./components/Files/FilesContext";
import ModalProvider from "./components/Modal/context/ModalContext";

export const FileTabContext = React.createContext<{
  tabs: tab[];
  setTabs: React.Dispatch<React.SetStateAction<tab[]>>;
}>({
  tabs: [
    {
      id: "",
      label: "",
      value: "",
      content: "",
      editorContent: "",
      editorSaved: true,
    },
  ],
  setTabs: () => null,
});
export const FileTabValueContext = React.createContext<{
  fileTabValue: string;
  setFileTabValue: React.Dispatch<React.SetStateAction<string>>;
}>({ fileTabValue: "", setFileTabValue: () => null });
export const ReloadEditorContext = React.createContext<{
  reloadEditorFlag: boolean;
  setReloadEditorFlag: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reloadEditorFlag: false, setReloadEditorFlag: () => null });

// export const userSettingsContext = React.createContext<{
//   ligatures: boolean;
//   setLigatures: React.Dispatch<React.SetStateAction<boolean>>;
//   editorTheme: boolean;
//   setEditorTheme: React.Dispatch<React.SetStateAction<boolean>>;
//   smoothCursorBlink: boolean;
//   setSmoothCursorBlink: React.Dispatch<React.SetStateAction<boolean>>;
//   smoothCaretAnimation: boolean;
//   setSmoothCaretAnimation: React.Dispatch<React.SetStateAction<boolean>>;
//   minimap: boolean;
//   setMinimap: React.Dispatch<React.SetStateAction<boolean>>;
//   saveFileOnFileChange: boolean;
//   setSaveFileOnFileChange: React.Dispatch<React.SetStateAction<boolean>>;
//   saveFileOnEditorClose: boolean;
//   setSaveFileOnEditorClose: React.Dispatch<React.SetStateAction<boolean>>;
//   showEditorConfigFolder: boolean;
//   setShowEditorConfigFolder: React.Dispatch<React.SetStateAction<boolean>>;
//   pythonIntellisense: boolean;
//   setPythonIntellisense: React.Dispatch<React.SetStateAction<boolean>>;
//   cppIntellisense: boolean;
//   setCppIntellisense: React.Dispatch<React.SetStateAction<boolean>>;
//   saveButtonSaveProject: boolean;
//   setSaveButtonSaveProject: React.Dispatch<React.SetStateAction<boolean>>;
// }>({
//   ligatures: true,
//   setLigatures: () => null,
//   editorTheme: true,
//   setEditorTheme: () => null,
//   smoothCursorBlink: true,
//   setSmoothCursorBlink: () => null,
//   smoothCaretAnimation: true,
//   setSmoothCaretAnimation: () => null,
//   minimap: true,
//   setMinimap: () => null,
//   saveFileOnFileChange: false,
//   setSaveFileOnFileChange: () => null,
//   saveFileOnEditorClose: true,
//   setSaveFileOnEditorClose: () => null,
//   showEditorConfigFolder: false,
//   setShowEditorConfigFolder: () => null,
//   pythonIntellisense: false,
//   setPythonIntellisense: () => null,
//   cppIntellisense: false,
//   setCppIntellisense: () => null,
//   saveButtonSaveProject: false,
//   setSaveButtonSaveProject: () => null,
// });

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const zeroSidebarWidth = 75,
    minSidebarWidth = 200;

  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalChildren, setModalChildren] = useState<ReactNode>("");

  const [tabs, setTabs] = useState<tab[]>([]);
  const [fileTabValue, setFileTabValue] = React.useState("");
  const [reloadEditorFlag, setReloadEditorFlag] = React.useState(false);

  const [isFinished, setIsFinished] = useState(true);
  const [PID, setPID] = useState<number>();

  // user settings
  // const [ligatures, setLigatures] = useState<boolean>(true);
  // const [editorTheme, setEditorTheme] = useState<boolean>(true);
  // const [smoothCursorBlink, setSmoothCursorBlink] = useState<boolean>(true);
  // const [smoothCaretAnimation, setSmoothCaretAnimation] =
  //   useState<boolean>(true);
  // const [minimap, setMinimap] = useState<boolean>(true);
  // const [saveFileOnFileChange, setSaveFileOnFileChange] =
  //   useState<boolean>(false);
  // const [saveFileOnEditorClose, setSaveFileOnEditorClose] =
  //   useState<boolean>(true);
  // const [showEditorConfigFolder, setShowEditorConfigFolder] =
  //   useState<boolean>(false);
  // const [pythonIntellisense, setPythonIntellisense] = useState<boolean>(false);
  // const [cppIntellisense, setCppIntellisense] = useState<boolean>(false);
  // const [saveButtonSaveProject, setSaveButtonSaveProject] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   const savedLigatures = localStorage.getItem("ligatures");
  //   const savedEditorTheme = localStorage.getItem("editorTheme");
  //   const savedSmoothCursorBlink = localStorage.getItem("smoothCursorBlink");
  //   const savedSmoothCaretAnimation = localStorage.getItem(
  //     "smoothCaretAnimation"
  //   );
  //   const savedMinimap = localStorage.getItem("minimap");
  //   const savedSaveFileOnFileChange = localStorage.getItem(
  //     "saveFileOnFileChange"
  //   );
  //   const savedSaveFileOnEditorClose = localStorage.getItem(
  //     "saveFileOnEditorClose"
  //   );
  //   const savedShowEditorConfigFolder = localStorage.getItem(
  //     "showEditorConfigFolder"
  //   );
  //   const savedPythonIntellisense = localStorage.getItem("pythonIntellisense");
  //   const savedCppIntellisense = localStorage.getItem("cppIntellisense");
  //   const savedSaveButtonSaveProject = localStorage.getItem(
  //     "saveButtonSaveProject"
  //   );

  //   if (savedLigatures) setLigatures(savedLigatures === "true");
  //   if (savedEditorTheme) setEditorTheme(savedEditorTheme === "true");
  //   if (savedSmoothCursorBlink)
  //     setSmoothCursorBlink(savedSmoothCursorBlink === "true");
  //   if (savedSmoothCaretAnimation)
  //     setSmoothCaretAnimation(savedSmoothCaretAnimation === "true");
  //   if (savedMinimap) setMinimap(savedMinimap === "true");
  //   if (savedSaveFileOnFileChange)
  //     setSaveFileOnFileChange(savedSaveFileOnFileChange === "true");
  //   if (savedSaveFileOnEditorClose)
  //     setSaveFileOnEditorClose(savedSaveFileOnEditorClose === "true");
  //   if (savedShowEditorConfigFolder)
  //     setShowEditorConfigFolder(savedShowEditorConfigFolder === "true");
  //   if (savedPythonIntellisense)
  //     setPythonIntellisense(savedPythonIntellisense === "true");
  //   if (savedCppIntellisense)
  //     setCppIntellisense(savedCppIntellisense === "true");
  //   if (savedSaveButtonSaveProject)
  //     setSaveButtonSaveProject(savedSaveButtonSaveProject === "true");
  // }, []);

  return (
    <>
      <Theme>
        {/* <userSettingsContext.Provider
          value={{
            ligatures: ligatures,
            setLigatures: setLigatures,
            editorTheme: editorTheme,
            setEditorTheme: setEditorTheme,
            smoothCursorBlink: smoothCursorBlink,
            setSmoothCursorBlink: setSmoothCursorBlink,
            smoothCaretAnimation: smoothCaretAnimation,
            setSmoothCaretAnimation: setSmoothCaretAnimation,
            minimap: minimap,
            setMinimap: setMinimap,
            saveFileOnFileChange: saveFileOnFileChange,
            setSaveFileOnFileChange: setSaveFileOnFileChange,
            saveFileOnEditorClose: saveFileOnEditorClose,
            setSaveFileOnEditorClose: setSaveFileOnEditorClose,
            showEditorConfigFolder: showEditorConfigFolder,
            setShowEditorConfigFolder: setShowEditorConfigFolder,
            pythonIntellisense: pythonIntellisense,
            setPythonIntellisense: setPythonIntellisense,
            cppIntellisense: cppIntellisense,
            setCppIntellisense: setCppIntellisense,
            saveButtonSaveProject: saveButtonSaveProject,
            setSaveButtonSaveProject: setSaveButtonSaveProject,
          }}
        > */}
          <ToastContext>
            <FileTabContext.Provider value={{ tabs: tabs, setTabs: setTabs }}>
              <FileTabValueContext.Provider
                value={{
                  fileTabValue: fileTabValue,
                  setFileTabValue: setFileTabValue,
                }}
              >
                <ReloadEditorContext.Provider
                  value={{
                    reloadEditorFlag: reloadEditorFlag,
                    setReloadEditorFlag,
                  }}
                >
                  <LoadFilesProvider>
                    <ModalProvider>
                      <ToolBar
                        // setModalOpen={setModalOpen}
                        // setModalChildren={setModalChildren}
                        isFinished={isFinished}
                        PID={PID}
                      />
                    </ModalProvider>

                    <div className="appContainer">
                      <SideBar
                        width={sidebarWidth}
                        widthUpdateFunction={setSidebarWidth}
                        zeroSidebarWidth={zeroSidebarWidth}
                        minSidebarWidth={minSidebarWidth}
                      >
                        <FileListing />
                      </SideBar>
                      <div
                        className="rightSide"
                        style={{
                          width:
                            "calc(100% - " +
                            (sidebarWidth > minSidebarWidth
                              ? sidebarWidth
                              : sidebarWidth > zeroSidebarWidth
                              ? minSidebarWidth
                              : 0) +
                            "px)",
                        }}
                      >
                        <EditorTabs />
                        <BottomBar
                          children={
                            <Terminal
                              isFinished={isFinished}
                              setIsFinished={setIsFinished}
                              PID={PID}
                              setPID={setPID}
                            />
                          }
                          isFinished={isFinished}
                          width={
                            "calc(100% - " +
                            (sidebarWidth > minSidebarWidth
                              ? sidebarWidth
                              : sidebarWidth > zeroSidebarWidth
                              ? minSidebarWidth
                              : 0) +
                            "px)"
                          }
                        />
                      </div>
                    </div>
                    {/* <SmoothModal
                        open={modalOpen}
                        setOpen={setModalOpen}
                        children={modalChildren}
                      /> */}
                  </LoadFilesProvider>
                </ReloadEditorContext.Provider>
              </FileTabValueContext.Provider>
            </FileTabContext.Provider>
          </ToastContext>
        {/* </userSettingsContext.Provider> */}
      </Theme>
    </>
  );
}

export default App;
