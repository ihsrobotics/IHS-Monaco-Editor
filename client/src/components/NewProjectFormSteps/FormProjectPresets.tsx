import { projectProps } from "../NewProjectForm";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

interface Props{
    prevStep: (arg0?: number) => void,
    nextStep: (arg0?: number) => void,
    handleCheckboxChange: (prop: ("presets" | "links" | "include"), e: React.ChangeEvent<HTMLInputElement>) => void,
    values: projectProps
}

function FormProjectPresets({ prevStep, nextStep, handleCheckboxChange , values }: Props){
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
                    Project Presets
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['presets'].includes('src')} onChange={(e) => handleCheckboxChange('presets', e)} name="src"/>} label="src" />
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['presets'].includes('include')} onChange={(e) => handleCheckboxChange('presets', e)} name="include"/>} label="include" />
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['presets'].includes('data')} onChange={(e) => handleCheckboxChange('presets', e)} name="data"/>} label="data" />
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={values['presets'].includes('bin')} onChange={(e) => handleCheckboxChange('presets', e)} name="bin"/>} label="bin" />
            </FormGroup>
            <Box justifyContent={'space-between'} display={'flex'} justifyItems={'flex-end'} flexDirection={'row-reverse'} mt={3}>
                <Button disableRipple variant="contained" onClick={next}>Next</Button>
                <Button disableRipple variant="contained" onClick={prev}>Back</Button>
            </Box>
        </>
    )
}

export default FormProjectPresets;