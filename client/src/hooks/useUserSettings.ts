import { useEffect, useState } from "react";

export type settingItem =
  | "ligatures"
  | "editorTheme"
  | "smoothCursorBlink"
  | "smoothCaretAnimation"
  | "minimap"
  | "saveFileOnFileChange"
  | "saveFileOnEditorClose"
  | "showEditorConfigFolder"
  | "pythonIntellisense"
  | "cppIntellisense"
  | "saveButtonSaveProject";

function useUserSettings() {
  const [userSettings, setUserSettings] = useState<{
    [key in settingItem]: boolean;
  }>({
    ligatures: true,
    editorTheme: true,
    smoothCursorBlink: true,
    smoothCaretAnimation: true,
    minimap: true,
    saveFileOnFileChange: false,
    saveFileOnEditorClose: true,
    showEditorConfigFolder: false,
    pythonIntellisense: false,
    cppIntellisense: false,
    saveButtonSaveProject: false,
  });

  const fetchUserSettings = () => {
    try {
      const storedSettings = localStorage.getItem("userSettings");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setUserSettings((prevSettings) => ({
          ...prevSettings,
          ...parsedSettings,
        }));
      }
    } catch (error) {
      console.error("Error fetching user settings:", error);
    }
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const updateUserSettings = (settingName: settingItem, newValue: boolean) => {
    try {
      localStorage.setItem(
        "userSettings",
        JSON.stringify({ ...userSettings, [settingName]: newValue })
      );
      setUserSettings((prevSettings) => ({
        ...prevSettings,
        [settingName]: newValue,
      }));
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  return { userSettings, updateUserSettings };
}

export default useUserSettings;
