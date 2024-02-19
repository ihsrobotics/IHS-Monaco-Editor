import loadable from "@loadable/component";
const MonacoEditor = loadable(() => import("react-monaco-editor"));
import { editor } from "monaco-editor";
import { memo, useEffect, useRef } from "react";
import { useState } from "react";
import * as githubDark from "../../assets/github-dark.json";
import useUserSettingsContext from "../ModalContent/UserSettingsForm/hooks/useUserSettingsContext";
import useEditorTabsContext from "../EditorTabs/hooks/useEditorTabsContext";

interface Props {
  fileName: string;
  content: Promise<string>;
}

const MemoIzedMonacoEditor = memo(MonacoEditor);

const CodeEditor = memo(function CodeEditor({ fileName, content }: Props) {
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
    editorRef.current = editor;

    if (editorRef.current) {
      if (tabs[index].editorContent === "") {
        editorRef.current.setValue(await content);
      } else {
        // this needs an await otherwise it will be an empty string
        editorRef.current.setValue(await tabs[index].editorContent);
      }
      setFileLoaded(true);
    }
  }

  useEffect(() => {
    if (!editorRef.current) return;

    const originalValue = editorRef.current.getValue();
    const interval = setInterval(() => {
      if (!editorRef.current) return;
      const newValue = editorRef.current.getValue();
      if (newValue !== originalValue && fileLoaded) {
        updateTab(index, {
          ...tabs[index],
          editorContent: newValue,
          editorSaved: false,
        });
      }
    }, 10);

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
        <MemoIzedMonacoEditor
          height="100%"
          width="100%"
          editorDidMount={handleEditorDidMount}
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
});

export default CodeEditor;
