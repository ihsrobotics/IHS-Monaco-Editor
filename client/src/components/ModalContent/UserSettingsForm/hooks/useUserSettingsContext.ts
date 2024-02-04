import { useContext } from "react";
import { UserSettingsContext } from "../context/UserSettingsContext";

export default function useUserSettingsContext() {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error(
      "useUserSettingsContext must be used within a UserSettingsProvider"
    );
  }
  return context;
}
