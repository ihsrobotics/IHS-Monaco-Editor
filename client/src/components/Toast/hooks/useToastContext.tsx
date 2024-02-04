import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export default function useToastContext() {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error(
        "useToastContext must be used within a ToastContext"
      );
    }
    return context;
}
