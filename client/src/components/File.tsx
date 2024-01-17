import h from "../assets/file_icons/h.svg";
import hpp from "../assets/file_icons/hpp.svg";
import c from "../assets/file_icons/c.svg";
import cpp from "../assets/file_icons/cpp.svg";
import js from "../assets/file_icons/js.svg";
import json from "../assets/file_icons/json.svg";
import ts from "../assets/file_icons/ts.svg";
import py from "../assets/file_icons/py.svg";

import NotesIcon from '@mui/icons-material/Notes';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { MouseEvent, useContext, useEffect, useState } from "react";

import BranchExtension from '../assets/branches/branchExtension.svg';
import { deleteItem, getFile, rename } from "../shell";

import { FileTabContext, FileTabValueContext, FileUpdateContext, ToastContext } from "../App";
import CodeEditor from "./CodeEditor";

interface IconConnector{
    [key: string]: string
}

const fileIcons: IconConnector = {
    "h": h,
    "hpp": hpp,
    "c": c,
    "cpp": cpp,
    "js": js,
    "json": json,
    "ts": ts,
    "py": py
}

interface Props{
    name: string,
    depth: number
}
 // name conflict with some random thing
function FileComponent({ name, depth }: Props) {    
    const fileExtension: string = name.split('.').length > 1 ? name.split('.').pop()! : '';

    const [isHovered, setIsHovered] = useState(false);
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    const handleMouseEnter = (e:MouseEvent<HTMLDivElement>) => {
        if(window.getComputedStyle(e.currentTarget).cursor == 'col-resize'){
            e.currentTarget.classList.remove('hoverEffect');
        }
        else{
            e.currentTarget.classList.add('hoverEffect');
        }
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.shiftKey){
            setIsShiftPressed(true);
        }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
        if(!e.shiftKey){
            setIsShiftPressed(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    const {fileUpdateFlag, setFileUpdateFlag} = useContext(FileUpdateContext);
    const {setToastProps} = useContext(ToastContext);

    const { tabs } = useContext(FileTabContext)
    const { setFileTabValue } = useContext(FileTabValueContext)
    // const { reloadEditorFlag, setReloadEditorFlag } = useContext(ReloadEditorContext);

    const handleClick = async () => {
        // this file is already open
        if(tabs.some(tab => tab.value === name)){
            setFileTabValue(name);
            return;
        }

        tabs.push({
            id: name,
            label: name.split('/').slice(-1).toString(),
            value: name,
            // content: await getFile(name)
            content: <CodeEditor fileName={name} content={await getFile(name)}/>,
            editorContent: '', 
            editorSaved: true
        });
        setFileTabValue(name);
    }

    return(
        <div className="file" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} >
            <span className="fileName" style={{paddingLeft: (2*depth*12)+"px", height: "24px"}}>
                {/* <span style={{ width: "24px", height: "24px", flexShrink: "0"}}></span> */}
                <img src={BranchExtension} alt="" style={{flexShrink: "0", marginLeft: "-5px", width: "29px", height: "24px"}}/>
                {
                    fileExtension in fileIcons ? <img src={fileIcons[fileExtension]} alt="" /> : <NotesIcon style={{ height: "16px" }}/>
                }
                <span>{name.split('/').slice(-1).toString()}</span>
                <div className="fileToolButtons">
                    { isHovered && isShiftPressed && (
                        <>
                            <Tooltip title={"rename"} placement="top" arrow>
                                <DriveFileRenameOutlineIcon onClick={() => rename(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>   
                            </Tooltip>
                            <Tooltip title={"delete"} placement="top" arrow>
                                <DeleteIcon onClick={() => deleteItem(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>
                            </Tooltip>
                        </>
                    )} 
                </div>
            </span>
        </div>
    )
}

export default FileComponent;