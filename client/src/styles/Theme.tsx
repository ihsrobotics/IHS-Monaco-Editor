import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";
import useUserSettingsContext from "../components/ModalContent/UserSettingsForm/hooks/useUserSettingsContext";

interface Props {
  children: ReactNode;
}

export default function Theme({ children }: Props) {
  const { userSettings } = useUserSettingsContext();
  const THEME = createTheme({
    typography: {
      fontFamily: [
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Noto Sans",
        "Liberation Sans",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ].join(","),
      fontSize: 16,
      body1: {
        fontFamily: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Noto Sans",
          "Liberation Sans",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ].join(","),
        fontSize: 16,
      },
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#BFC6C8",
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: !userSettings.buttonRipple,
        },
      },
      MuiTab: {
        defaultProps: {
          disableFocusRipple: true,
        },
      },
    },
  });

  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
