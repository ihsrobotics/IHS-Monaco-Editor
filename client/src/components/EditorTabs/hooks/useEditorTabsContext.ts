import { useContext } from "react";
import { EditorTabsContext } from "../context/EditorTabsContext";

function useEditorTabsContext() {
  const context = useContext(EditorTabsContext);
  if (!context) {
    throw new Error(
      "useEditorTabsContext must be used within a EditorTabsContext"
    );
  }
  return context;
}

export default useEditorTabsContext;
