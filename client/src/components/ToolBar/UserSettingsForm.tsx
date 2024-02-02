import { Stack, Switch, Typography } from "@mui/material";
// import { useContext } from "react";
// import { userSettingsContext } from "../../App";
import useUserSettings from "../../hooks/useUserSettings";

function UserSettingsForm() {
  // const {
  //   ligatures,
  //   setLigatures,
  //   editorTheme,
  //   setEditorTheme,
  //   smoothCursorBlink,
  //   setSmoothCursorBlink,
  //   smoothCaretAnimation,
  //   setSmoothCaretAnimation,
  //   minimap,
  //   setMinimap,
  //   saveFileOnFileChange,
  //   setSaveFileOnFileChange,
  //   saveFileOnEditorClose,
  //   setSaveFileOnEditorClose,
  //   showEditorConfigFolder,
  //   setShowEditorConfigFolder,
  //   pythonIntellisense,
  //   setPythonIntellisense,
  //   cppIntellisense,
  //   setCppIntellisense,
  //   saveButtonSaveProject,
  //   setSaveButtonSaveProject,
  // } = useContext(userSettingsContext);
  const { userSettings, updateUserSettings } = useUserSettings();

  return (
    <>
      <Typography variant="h6" component="h2" align="center" mb={3}>
        User Settings
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Dark Theme
        <Switch
          checked={true}
          onClick={() => alert("do you not like dark mode?")}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Editor Font Ligatures
        <Switch
          checked={userSettings.ligatures}
          onChange={(e) => {
            updateUserSettings("ligatures", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Editor Minimap
        <Switch
          checked={userSettings.minimap}
          onChange={(e) => {
            updateUserSettings("minimap", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Editor Smooth Cursor Blinking
        <Switch
          checked={userSettings.smoothCursorBlink}
          onChange={(e) => {
            updateUserSettings("smoothCursorBlink", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Editor Smooth Caret Animation
        <Switch
          checked={userSettings.smoothCaretAnimation}
          onChange={(e) => {
            updateUserSettings("smoothCaretAnimation", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Editor Theme (VS Dark | GitHub Dark)
        <Switch
          checked={userSettings.editorTheme}
          onChange={(e) => {
            updateUserSettings("editorTheme", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        C++ IntelliSense
        <Switch
          disabled
          checked={userSettings.cppIntellisense}
          onChange={(e) => {
            updateUserSettings("cppIntellisense", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Python IntelliSense
        <Switch
          disabled
          checked={userSettings.pythonIntellisense}
          onChange={(e) => {
            updateUserSettings("pythonIntellisense", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Save Button Behavior (File Only | Project)
        <Switch
          disabled
          checked={userSettings.saveButtonSaveProject}
          onChange={(e) => {
            updateUserSettings("saveButtonSaveProject", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Save File on Editor Close
        <Switch
          checked={userSettings.saveFileOnEditorClose}
          onChange={(e) => {
            updateUserSettings("saveFileOnEditorClose", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Save File on File Change
        <Switch
          disabled
          checked={userSettings.saveFileOnFileChange}
          onChange={(e) => {
            updateUserSettings("saveFileOnFileChange", e.target.checked);
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          borderBottom: 0.5,
        }}
        alignSelf={"center"}
      >
        Show Project Config Folder (.editor)
        <Switch
          checked={userSettings.showEditorConfigFolder}
          onChange={(e) => {
            updateUserSettings("showEditorConfigFolder", e.target.checked);
          }}
        />
      </Stack>
    </>
  );
}

// export function saveSettings() {
//   const {
//     ligatures,
//     editorTheme,
//     smoothCursorBlink,
//     smoothCaretAnimation,
//     minimap,
//     saveFileOnFileChange,
//     saveFileOnEditorClose,
//     showEditorConfigFolder,
//     pythonIntellisense,
//     cppIntellisense,
//     saveButtonSaveProject,
//   } = useContext(userSettingsContext);
//   localStorage.setItem("ligatures", ligatures.toString());
//   localStorage.setItem("editorTheme", editorTheme.toString());
//   localStorage.setItem("smoothCursorBlink", smoothCursorBlink.toString());
//   localStorage.setItem("smoothCaretAnimation", smoothCaretAnimation.toString());
//   localStorage.setItem("minimap", minimap.toString());
//   localStorage.setItem("saveFileOnFileChange", saveFileOnFileChange.toString());
//   localStorage.setItem(
//     "saveFileOnEditorClose",
//     saveFileOnEditorClose.toString()
//   );
//   localStorage.setItem(
//     "showEditorConfigFolder",
//     showEditorConfigFolder.toString()
//   );
//   localStorage.setItem("pythonIntellisense", pythonIntellisense.toString());
//   localStorage.setItem("cppIntellisense", cppIntellisense.toString());
//   localStorage.setItem(
//     "saveButtonSaveProject",
//     saveButtonSaveProject.toString()
//   );
// }

export default UserSettingsForm;
