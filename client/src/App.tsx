import { useState } from "react";
import SideBar from "./components/Files/SideBar";
import "./styles/App.css";
import FileListing from "./components/Files/FileListing";

import React from "react";
import ToolBar from "./components/ToolBar/ToolBar";
import EditorTabs from "./components/EditorTabs/EditorTabs";
import BottomBar from "./components/Terminal/BottomBar";
import Terminal from "./components/Terminal/Terminal";
import Theme from "./styles/Theme";
import LoadFilesProvider from "./components/Files/context/FilesContext";
import ModalProvider from "./components/Modal/context/ModalContext";
import UserSettingsProvider from "./components/ModalContent/UserSettingsForm/context/UserSettingsContext";
import ToastProvider from "./components/Toast/context/ToastContext";
import EditorTabsProvider from "./components/EditorTabs/context/EditorTabsContext";

export const ReloadEditorContext = React.createContext<{
  reloadEditorFlag: boolean;
  setReloadEditorFlag: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reloadEditorFlag: false, setReloadEditorFlag: () => null });

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const zeroSidebarWidth = 75,
    minSidebarWidth = 200;

  const [reloadEditorFlag, setReloadEditorFlag] = React.useState(false);

  const [isFinished, setIsFinished] = useState(true);
  const [PID, setPID] = useState<number>();

  return (
    <>
      <Theme>
        <ToastProvider>
          <UserSettingsProvider>
            <EditorTabsProvider>
              <ReloadEditorContext.Provider
                value={{
                  reloadEditorFlag: reloadEditorFlag,
                  setReloadEditorFlag,
                }}
              >
                <LoadFilesProvider>
                  <ModalProvider>
                    <ToolBar isFinished={isFinished} PID={PID} />
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
            </EditorTabsProvider>
          </UserSettingsProvider>
        </ToastProvider>
      </Theme>
    </>
  );
}

export default App;