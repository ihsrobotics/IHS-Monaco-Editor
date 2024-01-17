import TextField from "@mui/material/TextField";
import { projectProps } from "../NewProjectForm";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";

interface Props{
    nextStep: (arg0?: number) => void,
    handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    values: projectProps
}

function FormProjectName({ nextStep, handleTextChange, handleRadioChange , values }: Props){
    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        if(values['projectName'] === '' || values['projectType'] === '') return;
        if(values['projectType'] === 'python'){
            // python default presets
            values['presets'] = ['src', 'include', 'data']
        }
        else if(values['projectType'] === 'cpp'){
            // cpp default presets
            values['presets'] = ['src', 'include', 'data', 'bin']
        }
        // remove any spaces from the name just in case
        values['projectName'] = values['projectName'].replace(/\s+/g, '');
        nextStep();
    }

    return(
        <>
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    Project Name
            </Typography>
            <FormControl >
                <TextField placeholder="Enter the project name" fullWidth label="Project Name" onChange={handleTextChange} defaultValue={values['projectName']} sx={{mb: 3}} required name="projectName"/>
                <FormLabel id="project-type-label" required>Project Type</FormLabel>
                <RadioGroup row aria-labelledby="project-type-label" name="projectType" onChange={handleRadioChange} value={values['projectType']} >
                    <FormControlLabel value="python" control={<Radio disableRipple />} label="Python" />
                    <FormControlLabel value="cpp" control={<Radio disableRipple/>} label="C++" />
                    <FormControlLabel value="custom" control={<Radio disableRipple/>} label="Custom" />
                </RadioGroup>
            </FormControl>
            <Box justifyContent={'space-between'} display={'flex'} justifyItems={'flex-end'} flexDirection={'row-reverse'} mt={3}>
                <Button disableRipple variant="contained" onClick={next}>Next</Button>
            </Box>
        </>
    )
}

export default FormProjectName;