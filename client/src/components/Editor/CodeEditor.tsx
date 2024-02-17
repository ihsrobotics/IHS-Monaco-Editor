import loadable from "@loadable/component";
const MonacoEditor = loadable(() => import("react-monaco-editor"));
import { editor } from "monaco-editor";
import { useEffect, useRef } from "react";
import { useState } from "react";
import * as githubDark from "../../assets/github-dark.json";
import useUserSettingsContext from "../ModalContent/UserSettingsForm/hooks/useUserSettingsContext";
import useEditorTabsContext from "../EditorTabs/hooks/useEditorTabsContext";

interface Props {
  fileName: string;
  content: Promise<string>;
}

function CodeEditor({ fileName, content }: Props) {
  const { userSettings } = useUserSettingsContext();

  const fileExtension: string =
    fileName.split(".").length > 1 ? fileName.split(".").pop()! : "";

  const {
    editorTabs: { array: tabs, update: updateTab },
  } = useEditorTabsContext();
  const index = tabs.findIndex((tab) => tab.value === fileName);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const [fileLoaded, setFileLoaded] = useState(false);

  editor.defineTheme("github-dark", githubDark as editor.IStandaloneThemeData);

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    if (fileLoaded) return;
    editorRef.current = editor;

    if (editorRef.current) {
      editorRef.current.setValue(await content);
      setFileLoaded(true);
    }
  }

  useEffect(() => {
    if (!editorRef.current) return;

    const originalValue = editorRef.current.getValue();
    console.log("reset original value");
    const interval = setInterval(() => {
      if (!editorRef.current) return;
      const newValue = editorRef.current.getValue();
      if (newValue !== originalValue && fileLoaded && tabs[index].editorSaved) {
        updateTab(index, {
          ...tabs[index],
          editorContent: newValue,
          editorSaved: false,
        });
        console.log(tabs[index].editorSaved);
      }
    }, 15);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <p
        style={{
          display: fileLoaded ? "none" : "block",
          color: "#BFC6C8",
        }}
      >
        Loading...
      </p>
      <div
        style={{
          height: "100%",
          width: "100%",
          visibility: fileLoaded ? "visible" : "hidden",
        }}
      >
        <MonacoEditor
          height="100%"
          width="100%"
          editorDidMount={handleEditorDidMount}
          // editorWillMount={handleEditorDidMount}
          theme={userSettings.editorTheme ? "github-dark" : "vs-dark"}
          options={{
            fontLigatures: userSettings.ligatures,
            fontFamily: "Fira Code",
            cursorBlinking: userSettings.smoothCursorBlink ? "phase" : "blink",
            cursorSmoothCaretAnimation: userSettings.smoothCaretAnimation
              ? "on"
              : "off",
            minimap: { enabled: userSettings.minimap },
            fontSize: 16,
          }}
          language={
            fileExtension === "py"
              ? "python"
              : fileExtension === "cpp" || fileExtension === "hpp"
              ? "cpp"
              : fileExtension === "c" || fileExtension === "h"
              ? "c"
              : fileExtension === "json"
              ? "json"
              : fileExtension === "js"
              ? "javascript"
              : fileExtension === "ts"
              ? "typescript"
              : "plaintext"
          }
        />
      </div>
    </>
  );
}

export default CodeEditor;
