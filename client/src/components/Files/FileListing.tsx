import { useCallback, useContext, useEffect, useState } from "react";
import Directory from "./Directory";
import "./styles/FileListing.css";

import FileComponent from "./File";
import { LoadFilesContext } from "./FilesContext";
import useUserSettings from "../../hooks/useUserSettings";

type MultiDimensionalArray = (string | number)[] | MultiDimensionalArray[];
type DirectoryObject = {[key: string]: {type: string, name: string} | DirectoryObject};


function FileListing() {
  // const { showEditorConfigFolder } = useContext(userSettingsContext);
  const { userSettings } = useUserSettings();
  const [fileList, setFileList] = useState<MultiDimensionalArray>([]);

  const { isFilesLoaded, projects, loadFiles } = useContext(LoadFilesContext);


  const unpackFiles = useCallback( (directory: DirectoryObject, path = ".", depth = 0): MultiDimensionalArray => {
    // files go at the end of the current directory
    const files = [];
    const ret = [];
    for (const item in directory) {
      if (
        directory[item]["type"] === "directory" &&
        (!item.includes(".editor") || userSettings.showEditorConfigFolder)
      ) {
        ret.push(["directory", path + "/" + item, depth]);
        ret.push(unpackFiles((directory[item] as DirectoryObject), path + "/" + item, depth + 1));
      } else if (
        directory[item]["name"] !== undefined &&
        (!(directory[item]["name"] as string).includes(".editor") || userSettings.showEditorConfigFolder)
      ) {
        files.push(["file", path + "/" + directory[item]["name"], depth]);
      }
    }
    ret.push(...files);
    return ret;
  }, [userSettings])

  useEffect(() => {
    loadFiles();
  }, [loadFiles])
  useEffect(() => {
    if(isFilesLoaded){
      setFileList(unpackFiles((projects as DirectoryObject)));
    }
  }, [isFilesLoaded, projects, unpackFiles])

  const is2DArray = (arr: unknown[]) => {
    if (Array.isArray(arr)) {
      return Array.isArray(arr[0]);
    }
    return false;
  };

  let parentDirectoryDepth: number;
  let uniqueParentDirectoryName: string;

  const FolderFiles = (files: MultiDimensionalArray, index: number) => {
    if (files.length == 0) {
      // empty directory
      return (
        <Directory
          key={index}
          depth={parentDirectoryDepth}
          name={uniqueParentDirectoryName}
        >
          <></>
        </Directory>
      );
    }
    if (is2DArray(files)) {
      // this is a child directory
      return (
        <Directory
          key={index}
          depth={parentDirectoryDepth}
          name={uniqueParentDirectoryName}
        >
          <ul className="childDirectory" id={uniqueParentDirectoryName}>
            {(files as MultiDimensionalArray[]).map((item, index) => FolderFiles(item, index))}
          </ul>
        </Directory>
      );
    } else if (files[0] === "file") {
      return <FileComponent key={index} name={files[1] as string} depth={files[2] as number} />;
    } else {
      uniqueParentDirectoryName = files[1].toString();
      parentDirectoryDepth = files[2] as number;
    }
  };

  return (
      isFilesLoaded ? <ul
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: "0",
          margin: "0",
          padding: "0",
        }}
      >
        {(fileList as MultiDimensionalArray[]).map((item, index) => FolderFiles(item, index))}
      </ul> : <p>Loading...</p>
  );
}

export default FileListing;
