import { useEffect, useState } from "react";
import { ADDRESS, PORT } from "../../env/address";

function useTerminalUser() {
  const [home, setHome] = useState("");
  const [currentDir, setCurrentDir] = useState("");
  const [user, setUser] = useState("");
  const [isTerminalLoaded, setIsTerminalLoaded] = useState(false);

  useEffect(() => {
    if (!isTerminalLoaded)
      fetch(`http://${ADDRESS}:${PORT}/api/getPath`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrentDir(data["path"]);
          setHome(data["home"]);
          setUser(data["user"]);
          setIsTerminalLoaded(true);
        });
  }, [isTerminalLoaded]);

  return { user, home, currentDir, setCurrentDir };
}

export default useTerminalUser;
