import React, { ReactNode, useCallback, useState } from "react";
import { address } from "../../address";

export const LoadFilesContext = React.createContext<{
  isFilesLoaded: boolean;
  setIsFilesLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  projects: object;
  setProjects: React.Dispatch<React.SetStateAction<object>>;
  loadFiles: () => void;
}>({
  isFilesLoaded: false,
  setIsFilesLoaded: () => null,
  projects: {},
  setProjects: () => null,
  loadFiles: () => {console.log("default call")}
});

interface Props {
  children: ReactNode;
}

function LoadFilesProvider({ children }: Props) {
  const [isFilesLoaded, setIsFilesLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<object>({});

  const loadFiles = useCallback(() =>  {
    console.log("load files called")
    setProjects({});
    setIsFilesLoaded(false);
    fetch("http://" + address + ":5000/api/getFileHierarchy", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProjects(data);
      })
      .then(() => {
        setIsFilesLoaded(true);
      })
      .catch(err => console.log('error loading files', err));
  }, []);

  

  return (
    <LoadFilesContext.Provider
      value={{
        isFilesLoaded: isFilesLoaded,
        setIsFilesLoaded: setIsFilesLoaded,
        projects: projects,
        setProjects: setProjects,
        loadFiles: loadFiles
      }}
    >
      {children}
    </LoadFilesContext.Provider>
  );
}

export default LoadFilesProvider;
