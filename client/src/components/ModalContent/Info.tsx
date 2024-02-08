import { Link, Typography } from "@mui/material";
import { version } from "../../../package.json";

function Info() {
  return (
    <>
      <Typography variant="h6" component="h2" align="center" mb={3}>
        IHS Monaco Editor (IME) <br /> v{version}
      </Typography>

      <Typography align="center">
        Made by snow.4060, 2024
        <br />
        <Link
          href="https://github.com/ihsrobotics/IHS-Monaco-Editor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </Link>
        <br />
        {version == '1.3.4' && <strong>v1.3.4 has online collaborative editing disabled.</strong>}
        <br />
        Unreleased features: full collaborative editing, intellisense, advanced
        save features
        <br /> <br />
        To rename, delete, or to add new file or folder, shift and hover over an
        existing file or folder.
        <br />
        Avoid using spaces or special characters in file names to prevent
        unexpected errors.
        <br />
        Contact snow on Discord for any unexpected problems.
      </Typography>
    </>
  );
}

export default Info;
