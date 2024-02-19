import React, { ReactNode, useState, useEffect, useCallback } from "react";
import useToastContext from "../../../Toast/hooks/useToastContext";

export type settingItem =
  | "buttonRipple"
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

const DEFAULT_SETTINGS = {
  buttonRipple: false,
  ligatures: true,
  editorTheme: true,
  smoothCursorBlink: true,
  smoothCaretAnimation: true,
  minimap: true,
  saveFileOnFileChange: true,
  saveFileOnEditorClose: true,
  showEditorConfigFolder: false,
  pythonIntellisense: false,
  cppIntellisense: false,
  saveButtonSaveProject: false,
};

interface Props {
  children: ReactNode;
}

export const UserSettingsContext = React.createContext<{
  userSettings: { [key in settingItem]: boolean };
  updateUserSettings: (settingName: settingItem, newValue: boolean) => void;
}>({ userSettings: DEFAULT_SETTINGS, updateUserSettings: () => null });

export default function UserSettingsProvider({ children }: Props) {
  const { toast } = useToastContext();
  const [userSettings, setUserSettings] = useState<{
    [key in settingItem]: boolean;
  }>(DEFAULT_SETTINGS);

  const fetchUserSettings = useCallback(() => {
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
      toast.error("Error fetching user settings " + error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

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

  return (
    <UserSettingsContext.Provider
      value={{
        userSettings: userSettings,
        updateUserSettings: updateUserSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}
