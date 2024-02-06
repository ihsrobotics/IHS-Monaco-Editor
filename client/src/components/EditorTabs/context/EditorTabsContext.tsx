import React, { ReactNode, useState } from "react";
import useArray from "../../../util/hooks/useArray";

interface tab {
  id: string;
  label: string;
  value: string;
  content: ReactNode;
  editorContent: string;
  editorSaved: boolean;
}

export const EditorTabsContext = React.createContext<{
  editorTabs: ReturnType<typeof useArray<tab>>;
  selectedTabValue: string;
  setSelectedTabValue: React.Dispatch<React.SetStateAction<string>>;
}>({
  editorTabs: {} as ReturnType<typeof useArray<tab>>,
  selectedTabValue: "",
  setSelectedTabValue: () => null,
});

interface Props {
  children: ReactNode;
}

function EditorTabsProvider({ children }: Props) {
  const editorTabs = useArray<tab>([]);
  const [selectedTabValue, setSelectedTabValue] = useState<string>("");
  return (
    <EditorTabsContext.Provider value={{ editorTabs, selectedTabValue, setSelectedTabValue }}>
      {children}
    </EditorTabsContext.Provider>
  );
}

export default EditorTabsProvider;
