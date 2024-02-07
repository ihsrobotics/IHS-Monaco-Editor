import { Button, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface ToolBarButtonProps {
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
  visible?: boolean
}

function ToolBarButton({
  name,
  handleClick,
  icon,
  disabled=false,
  color='primary',
  visible=true
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
        >
          {icon}
        </Button>
      </span>
    </Tooltip>
  );
}

export default ToolBarButton;
