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
import LoadFilesProvider from "./components/Files/FilesContext";
import ModalProvider from "./components/Modal/context/ModalContext";
import UserSettingsProvider from "./context/UserSettingsContext";
import ToastProvider from "./components/Toast/ToastContext";

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

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const zeroSidebarWidth = 75,
    minSidebarWidth = 200;

  const [tabs, setTabs] = useState<tab[]>([]);
  const [fileTabValue, setFileTabValue] = React.useState("");
  const [reloadEditorFlag, setReloadEditorFlag] = React.useState(false);

  const [isFinished, setIsFinished] = useState(true);
  const [PID, setPID] = useState<number>();

  return (
    <>
      <Theme>
          <ToastProvider>
          <UserSettingsProvider>
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
                  </LoadFilesProvider>
                </ReloadEditorContext.Provider>
              </FileTabValueContext.Provider>
            </FileTabContext.Provider>
            </UserSettingsProvider>
          </ToastProvider>
      </Theme>
    </>
  );
}

export default App;
