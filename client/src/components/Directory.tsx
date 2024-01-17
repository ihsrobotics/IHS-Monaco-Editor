import { ReactElement, useEffect, useState, MouseEvent, useContext } from "react"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderIcon from '@mui/icons-material/Folder';

import BeginBranch from "../assets/branches/beginBranch.svg";
import BeginBranchEnd from "../assets/branches/beginBranchEnd.svg";
import ContBranch from "../assets/branches/contBranch.svg";
import BranchEnd from "../assets/branches/branchEnd.svg";

import Straight from "../assets/branches/straight.svg";
import StraightEnd from "../assets/branches/StraightEnd.svg";

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Tooltip from '@mui/material/Tooltip';
import { deleteItem, newFile, newFolder, rename } from "../shell";
import { FileUpdateContext, ToastContext } from "../App";


interface Props{
    name: string,
    depth: number,
    isOpened?: boolean,
    // onOpen(arg0: string): void,
    children: ReactElement
}

// function Directory({name}: Props){
//     const [opened, setOpened] = useState(false);

//     const handleClick = () => {
//         setOpened(!opened);
//         console.log("dfiofhoifioewgv")
//     }


//     return(
//         <div className="directory" onClick={handleClick} data-opened={opened}>
//             {
//                 opened ? <KeyboardArrowDownIcon/> : <ChevronRightIcon/>
//             }
//             <FolderIcon/>
//             {name}
//         </div>
//     )
// }

function Directory({name, depth, children}: Props){
    const [opened, setOpened] = useState(false);
    const [branchArray, setBranchArray] = useState<string[]>([]);

    const handleClick = () => {
        setOpened(!opened);
    }

    const addStraightBranch = (directoryName: string, newBranchArray: string[]) => {
        if(document.getElementById(directoryName) == null || directoryName == null){ return; }
        const children = document.getElementById(directoryName)!.children;
        for(var i = 0; i < children.length; i++){
            newBranchArray.push(Straight);
            if(children[i].classList.contains('directory') && children[i].getAttribute('data-opened') == "true"){
                addStraightBranch(children[i].getAttribute('data-name')!, newBranchArray)
            }
        }
    }

    const handleUpdateBranches = (directoryName: string) => {
        let newBranchArray: string[] = []; 
        if(document.getElementById(directoryName) == null){ return; }
        const children = document.getElementById(directoryName)!.children;
        for(var i = 0; i < children.length; i++){
            newBranchArray.push(ContBranch);
            // recursive search directory
            if(children[i].classList.contains('directory') && children[i].getAttribute('data-opened') == "true"){
                addStraightBranch(children[i].getAttribute('data-name')!, newBranchArray);
            }
        }
        if(newBranchArray.length == 1){
            newBranchArray[0] = BeginBranchEnd;
        }
        else{
            newBranchArray[0] = BeginBranch;
            if(newBranchArray[newBranchArray.length-1] == Straight){
                newBranchArray[newBranchArray.length-1] = StraightEnd;
            }
            else{
                newBranchArray[newBranchArray.length-1] = BranchEnd;
            }
        }
        setBranchArray(newBranchArray);
    }

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

    return(
        <div className="directory" data-opened={opened} onClick={() => setTimeout(() => {
            handleUpdateBranches(name)
        }, 10)} data-name={name}>
            {/* the set timeout is so that the 'data-opened' attribute has time to update before updating the branches */}
            <div className="directoryName" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span onClick={handleClick} className="fileName" style={{ paddingLeft: (2*depth*12)+"px" }}> 
                    {
                        opened ? <KeyboardArrowDownIcon style={{ height: "24px" }}/> : <ChevronRightIcon style={{ height: "24px" }}/>
                    }
                    <FolderIcon style={{ height: "20px" }}/>
                    <span>{name.split('/').slice(-1).toString()}</span> 
                </span>
                
                <div className="fileToolButtons">
                    { isHovered && isShiftPressed && (
                        <>
                            <Tooltip title={"rename"} placement="top" arrow>
                                <DriveFileRenameOutlineIcon onClick={() => rename(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>   
                            </Tooltip>
                            <Tooltip title={"delete"} placement="top" arrow>
                                <DeleteIcon onClick={() => deleteItem(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>
                            </Tooltip>
                            <Tooltip title={"new file"} placement="top" arrow>
                                <NoteAddIcon onClick={() => newFile(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>
                            </Tooltip>
                            <Tooltip title={"new folder"} placement="top" arrow>
                                <CreateNewFolderIcon onClick={() => newFolder(name, fileUpdateFlag, setFileUpdateFlag, setToastProps)} style={{ height: "20px" }} className="brightenOnHover"/>
                            </Tooltip>
                        </>
                    )} 
                </div>

            </div>
            
            {
                    opened ? 
                    <div className="branch" style={{left: (2*depth*12)+"px"}}> 
                        {branchArray.map((value, index) => ( <img src={value} alt="" key={index}/> ))}
                    </div> : <></>
                }

            {children}
        </div>
    )
}

export default Directory;