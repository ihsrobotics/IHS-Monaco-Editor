import { useContext, useEffect, useState } from "react"
import Directory from "./Directory";
import "./FileListing.css"

import FileComponent from "./File";
import { userSettingsContext } from "../App";



interface Props{
    files: object
}

function FileListing({ files }: Props){
    const {showEditorConfigFolder} = useContext(userSettingsContext)
    const [fileList, setFileList] = useState<any[][]>([]);
    const [filesLoaded, setFilesLoaded] = useState<boolean>(false);

    
    function unpackFiles(directory: any, path='.', depth=0){
      // files go at the end of the current directory
      let files: any[] = [];
      let ret: any[][] = [];
      for(const item in directory){
        if(directory[item]["type"] === 'directory' && (!item.includes('.editor') || showEditorConfigFolder)){
    
          ret.push(['directory', path+'/'+item, depth])
          ret.push(unpackFiles(directory[item], path+'/'+item ,depth+1))
        }
        else if(directory[item]["name"] !== undefined  && (!directory[item]['name'].includes('.editor') || showEditorConfigFolder)){ 
          files.push(['file', path+'/'+directory[item]['name'], depth])
        }
      }
      ret.push(...files)
      return ret;
    }

    useEffect(() => { 
        if(!filesLoaded){
          setFileList(unpackFiles(files));
          setFilesLoaded(true);
        }
    }, []);


    const is2DArray = (arr: any[]) => {
      if(Array.isArray(arr)){
        return Array.isArray(arr[0]);
      }
      return false;
    }    

    // let parentDirectoryName: string; 
    let parentDirectoryDepth: number;
    let uniqueParentDirectoryName: string;

    // const handleChildOpen = (name: string) => {
    //   console.log("child opened", name);
    // }

    const FolderFiles = (files: any[], _index: number) => {
      if(files.length == 0){
        // empty directory
        return(
          <Directory depth={parentDirectoryDepth} name={uniqueParentDirectoryName} >
              <></>
          </Directory>
        )
      }
      if(is2DArray(files)){
        // this is a child directory
        return(
          <Directory depth={parentDirectoryDepth} name={uniqueParentDirectoryName}>
              <ul className="childDirectory" id={uniqueParentDirectoryName}>
              { files.map((item, index) => FolderFiles(item, index)) }
            </ul>
          </Directory>
          
        )
      }
      else if(files[0] === 'file'){
        return(
          <FileComponent name={files[1]} depth={files[2]}/>
        )
      }
      else{
        uniqueParentDirectoryName = files[1].toString();
        // parentDirectoryName = files[1].split('/').slice(-1).toString();
        parentDirectoryDepth = files[2]
      }
    }

    return (
        <>
            <ul style={ {overflow: "hidden",textOverflow: "ellipsis", margin: "0", padding: "0"} }>
                { fileList.map((item, index) => FolderFiles(item, index))}
            </ul>

        </> 
    )
}


export default FileListing;