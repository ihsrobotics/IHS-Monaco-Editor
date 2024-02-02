import Editor from "@monaco-editor/react";
import Loader from "@monaco-editor/loader";
import * as monaco from "monaco-editor";
import { useContext, useRef } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect } from "react";
import {
  FileTabContext,
  ReloadEditorContext,
} from "../../App";
import * as githubDark from "../../assets/github-dark.json"
import useUserSettings from "../../hooks/useUserSettings";

interface Props {
  fileName: string;
  content: Promise<string>;
}

function CodeEditor({ fileName, content }: Props) {
  // const {
  //   ligatures,
  //   editorTheme,
  //   minimap,
  //   smoothCursorBlink,
  //   smoothCaretAnimation,
  // } = useContext(userSettingsContext);
  const {userSettings} = useUserSettings();

  const fileExtension: string =
    fileName.split(".").length > 1 ? fileName.split(".").pop()! : "";

  const { tabs, setTabs } = useContext(FileTabContext);
  const index = tabs.findIndex((tab) => tab.value === fileName);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  let provider: WebrtcProvider;
  let monacoBinding: MonacoBinding;
  let doc: Y.Doc;

  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  useEffect(() => {
    if(userSettings.editorTheme)
      Loader.init()
        .then((monaco) => {
          // fetch("./../../assets/github-dark.json")
          //   .then((response) => {
          //     console.log(response);
          //     return response.json();
          //   })
          //   .then((data) => {
          //     console.log("data", data);
          //     monaco.editor.defineTheme(
          //       "github-dark",
          //       data as monaco.editor.IStandaloneThemeData
          //     );
          //     setIsThemeLoaded(true);
          //   });
          monaco.editor.defineTheme('github-dark', githubDark as monaco.editor.IStandaloneThemeData);
          setIsThemeLoaded(true);
        })
        .catch((error) => console.log(error));

    return () => {
      if (editorRef.current) {
        console.log("clean up");
        editorRef.current.dispose();
        doc.destroy();
        provider.disconnect();
        provider.destroy();
        monacoBinding.destroy();
      }
    };
  }, []);

  const {reloadEditorFlag} = useContext(ReloadEditorContext)

  useEffect(() => {}, [reloadEditorFlag])

  const [fileLoaded, setFileLoaded] = useState(false);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    doc = new Y.Doc();
    provider = new WebrtcProvider(fileName, doc);
    const type = doc.getText("monaco");

    // provider.awareness.on('change', () => {
    //   const numUsers = provider.awareness.getStates().size;
    //   console.log(`Number of users in the room: ${numUsers}`);
    // });

    monacoBinding = new MonacoBinding(
      type,
      editorRef.current.getModel()!,
      new Set([editorRef.current]),
      provider.awareness
    );

    // it takes a little bit of time for the webrtc provider to realize another user has joined
    // without this condition when another person joins the 'value' param will be added to the file again
    // if something isn't working try increasing the timeout

    // display loading.. while the webrtc stuff finishes connecting

    setTimeout(async () => {
      if (provider.awareness.getStates().size < 2) {
        // if no one else is already on the file then load from source
        editorRef.current ? editorRef.current.setValue(await content) : null;
      }
      setFileLoaded(true);

      // if the current editor value is different from source (joining an existing room) then update the editor state
      editorRef.current
        ? (tabs[index].editorContent = editorRef.current.getValue())
        : null;
    }, 500);
  }

  function handleChange() {
    if (editorRef.current == undefined || !fileLoaded) return;
    setTabs(prevTabs => {
      prevTabs[index].editorContent = editorRef.current!.getValue();
      prevTabs[index].editorSaved = false;
      return [...prevTabs];
    });
  }

  return (
    <>
      <p style={{ display: fileLoaded ? "none" : "block", color: "#BFC6C8" }}>
        Loading...
      </p>
      <div
        style={{
          height: "100%",
          width: "100%",
          visibility: fileLoaded ? "visible" : "hidden",
        }}
      >
        <Editor
          height="100%"
          width="100%"
          onMount={handleEditorDidMount}
          theme={isThemeLoaded && userSettings.editorTheme ? "github-dark" : "vs-dark"}
          options={{
            fontLigatures: userSettings.ligatures,
            fontFamily: "Fira Code",
            cursorBlinking: userSettings.smoothCursorBlink ? "phase" : "blink",
            cursorSmoothCaretAnimation: userSettings.smoothCaretAnimation ? "on" : "off",
            minimap: { enabled: userSettings.minimap },
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
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default CodeEditor;
