import React, { ReactNode } from "react";
import Toast, { ToastProps } from "./Toast";
import { AlertColor } from "@mui/material";

export const ToastContext = React.createContext<{
  useToast: ToastFunction;
}>({
  useToast: () => null,
});

interface Props {
  children: ReactNode;
}

export type ToastFunction = (open: boolean, severity: AlertColor, message: string) => void;

function ToastProvider({ children }: Props) {
  const [toast, setToast] = React.useState<ToastProps>({
    open: false,
    severity: "success",
    message: "",
  });
  const useToast = (open: boolean, severity: AlertColor, message: string) => {
    setToast({ open: open, severity: severity, message: message });
  };
  return (
    <ToastContext.Provider value={{ useToast }}>
      {children}
      <Toast
        open={toast["open"]}
        severity={toast["severity"]}
        message={toast["message"]}
        setToast={setToast}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
