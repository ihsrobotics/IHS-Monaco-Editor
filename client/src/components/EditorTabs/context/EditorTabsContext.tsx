import React, { ReactNode, useEffect, useState } from "react";
import useArray from "../../../util/hooks/useArray";
import useUserSettingsContext from "../../ModalContent/UserSettingsForm/hooks/useUserSettingsContext";
import useToastContext from "../../Toast/hooks/useToastContext";
import { saveFile } from "../../../util/shell";

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

  const { userSettings } = useUserSettingsContext();

  const [prevSelectedTabValue, setPrevSelectedTabValue] = useState<string>("");
  const [prevTabAmt, setPrevTabAmt] = useState(0);

  const { toast } = useToastContext();

  useEffect(() => {
    // file change that is not the result of closing a tab
    if (
      prevSelectedTabValue !== selectedTabValue &&
      prevSelectedTabValue !== "" &&
      prevTabAmt <= editorTabs.array.length &&
      userSettings.saveFileOnFileChange
    ) {
      const prevIndex = editorTabs.array.findIndex(
        (tab) => tab.value === prevSelectedTabValue
      );
      if (!editorTabs.array[prevIndex]) return;
      if (!editorTabs.array[prevIndex].editorSaved)
        saveFile(
          prevSelectedTabValue,
          editorTabs.array[prevIndex].editorContent,
          toast,
          () => {
            editorTabs.update(prevIndex, {
              ...editorTabs.array[prevIndex],
              editorSaved: true,
            });
          }
        );
    }
    setPrevSelectedTabValue(selectedTabValue);
    setPrevTabAmt(editorTabs.array.length);
  }, [
    selectedTabValue,
    prevSelectedTabValue,
    prevTabAmt,
    editorTabs.array.length,
    userSettings.saveFileOnFileChange,
    editorTabs.array,
    toast,
    editorTabs,
  ]);

  // useLogging(selectedTabValue, (prevSelectedTabValue) => {
  //   console.log("prev:", prevSelectedTabValue);
  //   console.log("current", selectedTabValue);
  //   console.log(selectedTabValue == prevSelectedTabValue);
  //   if (userSettings.saveFileOnFileChange) {
  //     const index = editorTabs.array.findIndex(
  //       (tab) => tab.value === prevSelectedTabValue
  //     );
  //     console.log(editorTabs.array[index]);
  //   }
  // });
  const fn = (e: KeyboardEvent) => {
    if (e.key === "Control") {
      console.log(editorTabs.array);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", fn);
    return () => {
      document.removeEventListener("keydown", fn);
    };
  });

  return (
    <EditorTabsContext.Provider
      value={{ editorTabs, selectedTabValue, setSelectedTabValue }}
    >
      {children}
    </EditorTabsContext.Provider>
  );
}

export default EditorTabsProvider;
