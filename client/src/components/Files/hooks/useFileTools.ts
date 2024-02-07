import { useEffect, MouseEvent, useState } from "react";

function useFileTools() {
  const [isHovered, setIsHovered] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (window.getComputedStyle(e.currentTarget).cursor == "col-resize") {
      e.currentTarget.classList.remove("hoverEffect");
    } else {
      e.currentTarget.classList.add("hoverEffect");
    }
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      setIsShiftPressed(true);
    }
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (!e.shiftKey) {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isHovered, isShiftPressed, handleMouseEnter, handleMouseLeave };
}

export default useFileTools;
