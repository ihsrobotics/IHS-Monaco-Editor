import { ReactNode } from "react";
import DraggableTabsList from "./DraggableTabsList";
import { DropResult } from "@hello-pangea/dnd";
import useEditorTabsContext from "./hooks/useEditorTabsContext";

export type tab = {
  id: string;
  label: string;
  value: string;
  content: ReactNode;
  editorContent: string;
  editorSaved: boolean;
};

function EditorTabs() {
  const {
    editorTabs: { array: tabs, setArray: setTabs },
  } = useEditorTabsContext();

  const onDragEnd = (result: DropResult) => {
    if (result == null || result.destination == null) return;
    const newTabs = Array.from(tabs);
    const draggedTab = newTabs.splice(result.source.index, 1)[0];
    newTabs.splice(result.destination.index, 0, draggedTab);
    setTabs(newTabs);
  };

  return (
    <div>
      <DraggableTabsList onDragEnd={onDragEnd} />
    </div>
  );
}

export default EditorTabs;
