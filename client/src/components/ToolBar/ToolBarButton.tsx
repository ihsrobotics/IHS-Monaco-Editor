import { Button, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";

interface ToolBarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  handleClick: () => void;
  icon: ReactNode;
  disabled?: boolean;
  color?:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "primary"
    | "inherit"
    | "secondary"
    | undefined;
  visible?: boolean;
  children?: ReactNode;
  component?: React.ElementType;
}

function ToolBarButton({
  name,
  handleClick,
  icon,
  disabled = false,
  color = "primary",
  visible = true,
  children = "",
  component = "button",
}: ToolBarButtonProps) {
  return (
    <Tooltip title={name} arrow>
      <span>
        <Button
          variant="outlined"
          color={color}
          onClick={handleClick}
          disabled={disabled}
          style={{ display: visible ? "" : "none" }}
          component={component}
        >
          {icon} {children}
        </Button>
      </span>
    </Tooltip>
  );
}

export default ToolBarButton;
