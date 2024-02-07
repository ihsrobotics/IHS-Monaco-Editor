import React, { ReactNode, useCallback, useState } from "react";
import { ADDRESS, PORT } from "../../../env/address";
import useToastContext from "../../Toast/hooks/useToastContext";

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
  loadFiles: () => null,
});

interface Props {
  children: ReactNode;
}

function LoadFilesProvider({ children }: Props) {
  const {toast} = useToastContext();
  const [isFilesLoaded, setIsFilesLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<object>({});

  const loadFiles = useCallback(() => {
    setProjects({});
    setIsFilesLoaded(false);
    fetch(`http://${ADDRESS}:${PORT}/api/getFileHierarchy`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .then(() => {
        setIsFilesLoaded(true);
      })
      .catch((error) => toast.error("error loading files " + error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadFilesContext.Provider
      value={{
        isFilesLoaded: isFilesLoaded,
        setIsFilesLoaded: setIsFilesLoaded,
        projects: projects,
        setProjects: setProjects,
        loadFiles: loadFiles,
      }}
    >
      {children}
    </LoadFilesContext.Provider>
  );
}

export default LoadFilesProvider;
