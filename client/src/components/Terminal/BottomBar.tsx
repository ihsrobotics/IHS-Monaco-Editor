import React, { ReactNode, useEffect } from "react";
import { useRef, useState } from "react";
import "./styles/BottomBar.css";
import { CircularProgress } from "@mui/material";

interface Props {
  width: string;
  children: ReactNode;
  isFinished: boolean;
}

function BottomBar({ children, width, isFinished }: Props) {
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(200);
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);
  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: globalThis.MouseEvent) => {
      if (isResizing) {
        setHeight(
          bottomBarRef.current === null
            ? 0
            : -(
                mouseMoveEvent.clientY -
                bottomBarRef.current.getBoundingClientRect().bottom
              )
        );
      }
      if (isResizing) {
        document.body.style.cursor = "row-resize ";
      } else {
        document.body.style.cursor = "auto";
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      className="app-bottomBar"
      ref={bottomBarRef}
      style={{
        height: height + "px",
        width: width,

        userSelect: isResizing ? "none" : "unset",
        msUserSelect: isResizing ? "none" : "unset",
        MozUserSelect: isResizing ? "none" : "unset",
        WebkitUserSelect: isResizing ? "none" : "unset",
      }}
    >
      <CircularProgress
        style={{
          position: "absolute",
          right: "10px",
          top: "14px",
          visibility: !isFinished ? "visible" : "hidden",
        }}
        size={"2rem"}
      />
      <div className="app-bottomBar-content">{children}</div>
      <div
        className="app-bottomBar-resizer"
        style={isResizing ? { backgroundColor: "#c1c3c5b4" } : {}}
        onMouseDown={startResizing}
      />
    </div>
  );
}

export default BottomBar;
