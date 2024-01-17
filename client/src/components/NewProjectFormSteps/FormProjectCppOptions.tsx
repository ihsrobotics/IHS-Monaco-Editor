import { projectProps } from "../NewProjectForm";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";

interface Props{
    prevStep: (arg0?: number) => void,
    nextStep: (arg0?: number) => void,
    handleCheckboxChange: (prop: ("presets" | "links" | "include"), e: React.ChangeEvent<HTMLInputElement>) => void,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    values: projectProps
}

function FormProjectCppOptions({ prevStep, nextStep, handleCheckboxChange, handleRadioChange, values }: Props){
    if(!values['presets'].includes('src') || values['projectType']!=='cpp'){
        nextStep();
    }

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        prevStep();
    }
    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        nextStep();
    }

    return(
        <>
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    C++ Compiler Options
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['include']} onChange={(e) => handleCheckboxChange('include', e)} />} label="-I ./include"/>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['links'].includes('kipr')} onChange={(e) => handleCheckboxChange('links', e)} name="kipr"/>} label="-lkipr" />
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['links'].includes('ihsboost')} onChange={(e) => handleCheckboxChange('links', e)} name="ihsboost"/>} label="-lihsboost" />
            </FormGroup>
            <FormControl >
                <FormLabel id="project-optimization-label" required>Optimization (-O)</FormLabel>
                <RadioGroup row aria-labelledby="project-optimization-label" name="projectType" onChange={handleRadioChange} defaultValue={values['optimization']} >
                    <FormControlLabel value="0" control={<Radio disableRipple />} label="(none)" />
                    <FormControlLabel value="1" control={<Radio disableRipple />} label="1" />
                    <FormControlLabel value="2" control={<Radio disableRipple/>} label="2" />
                    <FormControlLabel value="3" control={<Radio disableRipple/>} label="3" />
                </RadioGroup>
            </FormControl>
            <Box justifyContent={'space-between'} display={'flex'} justifyItems={'flex-end'} flexDirection={'row-reverse'} mt={3}>
                <Button disableRipple variant="contained" onClick={next}>Next</Button>
                <Button disableRipple variant="contained" onClick={prev}>Back</Button>
            </Box>
        </>
    )
}

export default FormProjectCppOptions;