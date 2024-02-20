import { Box, Typography } from "@mui/material";
import useUserSettingsContext from "./hooks/useUserSettingsContext";
import UserSettingSwitch from "./UserSettingSwitch";

function UserSettingsForm() {
  const { userSettings } = useUserSettingsContext();

  return (
    <>
      <Typography variant="h6" component="h2" align="center" mb={3} width={400}>
        User Settings
      </Typography>
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <UserSettingSwitch
          label="Button Ripple"
          checked={userSettings.buttonRipple}
          item="buttonRipple"
        />
        <UserSettingSwitch
          label="Dark Theme"
          checked={true}
          item="editorTheme"
          specialBehaviorFunction={alert}
          specialBehaviorParams={"do you not like dark mode?"}
        />
        <UserSettingSwitch
          label="Editor Font Ligatures"
          checked={userSettings.ligatures}
          item="ligatures"
        />
        <UserSettingSwitch
          label="Editor Minimap"
          checked={userSettings.minimap}
          item="minimap"
        />
        <UserSettingSwitch
          label="Editor Smooth Cursor Blinking"
          checked={userSettings.smoothCursorBlink}
          item="smoothCursorBlink"
        />
        <UserSettingSwitch
          label="Editor Smooth Caret Animation"
          checked={userSettings.smoothCaretAnimation}
          item="smoothCaretAnimation"
        />
        <UserSettingSwitch
          label="Editor Theme (VS Dark | GitHub Dark)"
          checked={userSettings.editorTheme}
          item="editorTheme"
        />
        <UserSettingSwitch
          label="C++ Intellisense"
          checked={userSettings.cppIntellisense}
          item="cppIntellisense"
          disabled
        />
        <UserSettingSwitch
          label="Python Intellisense"
          checked={userSettings.pythonIntellisense}
          item="pythonIntellisense"
          disabled
        />
        <UserSettingSwitch
          label="Save Button Behavior (File Only | Project)"
          checked={userSettings.saveButtonSaveProject}
          item="saveButtonSaveProject"
        />
        <UserSettingSwitch
          label="Save File on Editor Close"
          checked={userSettings.saveFileOnEditorClose}
          item="saveFileOnEditorClose"
        />
        <UserSettingSwitch
          label="Save File on File Change"
          checked={userSettings.saveFileOnFileChange}
          item="saveFileOnFileChange"
        />
        <UserSettingSwitch
          label="Show Project Config Folder (.editor)"
          checked={userSettings.showEditorConfigFolder}
          item="showEditorConfigFolder"
        />
      </Box>
    </>
  );
}

export default UserSettingsForm;
