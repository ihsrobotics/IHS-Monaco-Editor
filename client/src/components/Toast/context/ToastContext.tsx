import React, { ReactNode } from "react";
import Toast, { ToastProps } from "../Toast";
import { AlertColor } from "@mui/material";

export interface Toast {
  success: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

export const ToastContext = React.createContext<{ toast: Toast }>({
  toast: {
    success: () => null,
    warn: () => null,
    error: () => null,
    info: () => null,
  },
});

interface Props {
  children: ReactNode;
}

export type ToastFunction = (
  open: boolean,
  severity: AlertColor,
  message: string
) => void;

function ToastProvider({ children }: Props) {
  const [toastState, setToastState] = React.useState<ToastProps>({
    open: false,
    severity: "success",
    message: "",
  });

  const toast = {
    success: (message: string) => {
      setToastState({ open: true, severity: "success", message: message });
    },
    warn: (message: string) => {
      setToastState({ open: true, severity: "warning", message: message });
    },
    error: (message: string) => {
      setToastState({ open: true, severity: "error", message: message });
    },
    info: (message: string) => {
      setToastState({ open: true, severity: "info", message: message });
    },
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toast
        open={toastState["open"]}
        severity={toastState["severity"]}
        message={toastState["message"]}
        setToast={setToastState}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
