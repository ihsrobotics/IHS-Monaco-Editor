import React, { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import "./styles/SideBar.css";

interface Props {
  width: number;
  widthUpdateFunction: (width: number) => void;
  zeroSidebarWidth: number;
  minSidebarWidth: number;
  children: ReactNode;
}

function SideBar({
  width,
  widthUpdateFunction,
  zeroSidebarWidth,
  minSidebarWidth,
  children,
}: Props) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: globalThis.MouseEvent) => {
      if (isResizing) {
        widthUpdateFunction(
          sidebarRef.current == null
            ? 0
            : mouseMoveEvent.clientX -
                sidebarRef.current.getBoundingClientRect().left
        );
      }
      if (isResizing) {
        document.body.style.cursor = "col-resize";
      } else {
        document.body.style.cursor = "auto";
      }
    },
    [isResizing, widthUpdateFunction]
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
      className="app-sidebar"
      ref={sidebarRef}
      style={{
        width: width > minSidebarWidth ? width : 0,
        minWidth: width > zeroSidebarWidth ? minSidebarWidth : 0,
      }}
      // onMouseDown={(e) => e.preventDefault()}
    >
      <div className="app-sidebar-content">{children}</div>
      <div
        className="app-sidebar-resizer"
        style={isResizing ? { backgroundColor: "#c1c3c5b4" } : {}}
        onMouseDown={startResizing}
      />
    </div>
  );
}

export default SideBar;
