import { Link, Typography } from "@mui/material";

function Info(){

    return(
        <>
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    IHS Monaco Editor (IME) <br/> v1.1.1
            </Typography>

            <Typography align="center">
            Made by snow.4060, 2024
            <br/>
            <Link href="https://google.com" target="_blank" rel="noopener noreferrer">Source</Link>
            <br/>
            Unreleased features: full collaborative editing, intellisense, advanced save features
            <br/> <br/>
            Avoid using spaces and special characters in file names to prevent unexpected errors.
            <br/>
            Contact snow on discord for any unexpected problems.
            </Typography>
        </>
    )
}

export default Info;