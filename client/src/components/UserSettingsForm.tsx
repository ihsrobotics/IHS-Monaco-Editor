import { Stack, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import { userSettingsContext } from "../App";




function UserSettingsForm(){
    const { ligatures, setLigatures, editorTheme, setEditorTheme, smoothCursorBlink, setSmoothCursorBlink, smoothCaretAnimation, setSmoothCaretAnimation, minimap, setMinimap, saveFileOnFileChange, setSaveFileOnFileChange, saveFileOnEditorClose, setSaveFileOnEditorClose, showEditorConfigFolder, setShowEditorConfigFolder, pythonIntellisense, setPythonIntellisense, cppIntellisense, setCppIntellisense, saveButtonSaveProject, setSaveButtonSaveProject } = useContext(userSettingsContext);

    return(
        <>
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    User Settings
            </Typography>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Dark Theme
                <Switch checked={true} onClick={() => alert('do you not like dark mode?')}/>
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Editor Font Ligatures
                <Switch checked={ligatures} onChange={(e) => {setLigatures(e.target.checked); localStorage.setItem('ligatures', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Editor Minimap
                <Switch checked={minimap} onChange={(e) => {setMinimap(e.target.checked); localStorage.setItem('minimap', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Editor Smooth Cursor Blinking
                <Switch checked={smoothCursorBlink} onChange={(e) => {setSmoothCursorBlink(e.target.checked); localStorage.setItem('smoothCursorBlink', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Editor Smooth Caret Animation
                <Switch checked={smoothCaretAnimation} onChange={(e) => {setSmoothCaretAnimation(e.target.checked); localStorage.setItem('smoothCaretAnimation', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Editor Theme (VS Dark | GitHub Dark)
                <Switch checked={editorTheme} onChange={(e) => {setEditorTheme(e.target.checked); localStorage.setItem('editorTheme', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                C++ IntelliSense
                <Switch disabled checked={cppIntellisense} onChange={(e) => {setCppIntellisense(e.target.checked); localStorage.setItem('cppIntellisense', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Python IntelliSense
                <Switch disabled checked={pythonIntellisense} onChange={(e) => {setPythonIntellisense(e.target.checked); localStorage.setItem('pythonIntellisense', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Save Button Behavior (File Only | Project)
                <Switch disabled checked={saveButtonSaveProject} onChange={(e) => {setSaveButtonSaveProject(e.target.checked); localStorage.setItem('saveButtonSaveProject', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Save File on Editor Close
                <Switch checked={saveFileOnEditorClose} onChange={(e) => {setSaveFileOnEditorClose(e.target.checked); localStorage.setItem('saveFileOnEditorClose', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Save File on File Change
                <Switch disabled checked={saveFileOnFileChange} onChange={(e) => {setSaveFileOnFileChange(e.target.checked); localStorage.setItem('saveFileOnFileChange', e.target.checked.toString())}} />
            </Stack>
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center', width: '400px', borderBottom: 0.5}} alignSelf={'center'}>
                Show Project Config Folder (.editor)
                <Switch checked={showEditorConfigFolder} onChange={(e) => {setShowEditorConfigFolder(e.target.checked); localStorage.setItem('showEditorConfigFolder', e.target.checked.toString())}} />
            </Stack>
        </>
    )
}

export function saveSettings(){
    const { ligatures, editorTheme, smoothCursorBlink, smoothCaretAnimation, minimap, saveFileOnFileChange, saveFileOnEditorClose, showEditorConfigFolder, pythonIntellisense, cppIntellisense, saveButtonSaveProject } = useContext(userSettingsContext);
    localStorage.setItem('ligatures', ligatures.toString());
    localStorage.setItem('editorTheme', editorTheme.toString());
    localStorage.setItem('smoothCursorBlink', smoothCursorBlink.toString());
    localStorage.setItem('smoothCaretAnimation', smoothCaretAnimation.toString());
    localStorage.setItem('minimap', minimap.toString());
    localStorage.setItem('saveFileOnFileChange', saveFileOnFileChange.toString());
    localStorage.setItem('saveFileOnEditorClose', saveFileOnEditorClose.toString());
    localStorage.setItem('showEditorConfigFolder', showEditorConfigFolder.toString());
    localStorage.setItem('pythonIntellisense', pythonIntellisense.toString());
    localStorage.setItem('cppIntellisense', cppIntellisense.toString());
    localStorage.setItem('saveButtonSaveProject', saveButtonSaveProject.toString());
}

export default UserSettingsForm;