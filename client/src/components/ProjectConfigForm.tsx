import { Typography, FormControl, TextField, Box, Button } from "@mui/material";
import { getFile, saveFile } from "../shell";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../App";

interface Props{
    project: string, 
    setModalOpen: (arg0: boolean) => void
}

function ProjectConfigForm({ project, setModalOpen }: Props){
    const [configs, setConfigs] = useState<any>({});
    const [configsLoaded, setConfigsLoaded] = useState(false);
    const {setToastProps} = useContext(ToastContext);

    useEffect(() => {
        if(!configsLoaded){
            getFile(project.split('/').slice(0, 2).join('/')+"/.editor/config.json").then(
                response => {setConfigs(JSON.parse(response)); setConfigsLoaded(true)}
            );
        }
    }, []);
    
    
    
    const handleCompileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        configs.compile = e.target.value;
    }
    const handleRunChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        configs.run = e.target.value;
    }

    const cancel = () => {
        setModalOpen(false);
    }
    const save = () => {
        setModalOpen(false);
        try{
            saveFile(project.split('/').slice(0, 2).join('/')+"/.editor/config.json", JSON.stringify(configs));
            setToastProps({open: true, severity: 'success', message: 'project configs updated'})
        } catch(error){
            console.log(error);
            setToastProps({open: true, severity: 'error', message: (error as string)})
        }
        
    }    

    return(
        <>
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    {project.split('/').slice(1, 2).join('/')} Configs
            </Typography>

            {configsLoaded ? 
                <FormControl >
                    <TextField fullWidth label="compile command" onChange={handleCompileChange} defaultValue={configs.compile} sx={{mb: 3}} name="compile command"/>
                    <TextField fullWidth label="run command" onChange={handleRunChange} defaultValue={configs.run} name="run command" />
                </FormControl>
                : <></>
            }
            
            <Box justifyContent={'space-between'} display={'flex'} justifyItems={'flex'} flexDirection={'row'} mt={3}>
                <Button disableRipple variant="contained" onClick={cancel}>Cancel</Button>
                <Button disableRipple variant="contained" onClick={save}>Save</Button>
            </Box>
        </>
    )
}

export default ProjectConfigForm;