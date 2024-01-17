import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { projectProps } from "../NewProjectForm";
import { newFile, newFolder, saveFile } from "../../shell";
import { FileUpdateContext, ToastContext, ToastProps } from "../../App";
import { useContext } from "react";


interface Props{
    prevStep: (arg0?: number) => void,
    nextStep: (arg0?: number) => void,
    values: projectProps
}

async function makeNewProject({ projectName, presets, boilerplate, include, links, optimization }: projectProps, setToastProps: React.Dispatch<ToastProps>, fileUpdateFlag: boolean, setFileUpdateFlag: React.Dispatch<boolean>){
  try{
    // make the project folder
    await newFolder('', false, undefined, undefined, projectName);

    // make the preset folders
    presets.forEach(async (presetFolder) => {
      await newFolder(projectName, false, undefined, undefined, presetFolder);
    });

    // create the main file
    const response = await fetch('http://localhost:5000/api/writeBp', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({filePath: projectName, boilerplate: boilerplate})
        }
    )
    if(!response.ok) throw "error in creating boilerplate, "+response.json();
    
    // create the project configurations
    let configs: any = {run: '', compile: ''};
    configs.run = boilerplate==='py-bp' || boilerplate==='py-nobp' ? 'python3 '+projectName+'/src/main.py' : (boilerplate==='cpp-bp' || boilerplate==='cpp-nobp') && presets.includes('bin') ? './'+projectName+'/bin/a.out' : '';
    configs.compile = (boilerplate==='cpp-bp' || boilerplate==='cpp-nobp') && presets.includes('bin') ? ('g++ '+projectName+'/src/main.cpp') + (' -o '+projectName+'/bin/a.out') + (include && presets.includes('include') ? ' -I '+projectName+'/include' : '')+(links.map(link => ' -l'+link))+(optimization===3 ? ' -O3' : optimization===2 ? ' -O2' : optimization===1 ? '-O1' : '') : ''
  
    // write the project configurations
    await newFolder(projectName, false, undefined, undefined, "'.editor'");
    await newFile(projectName+'/.editor', false, undefined, undefined, 'config.json')
    await saveFile(projectName+'/.editor/config.json', JSON.stringify(configs));
    setToastProps({open: true, severity: 'success', message: projectName+' created successfully'});
    setFileUpdateFlag(!fileUpdateFlag);
  } catch(error){
    console.log(error);
    setToastProps({open: true, severity: 'error', message: (error as string)})
  }
}

function FormConfirm({prevStep, nextStep, values}: Props){
    const {setToastProps} = useContext(ToastContext);
    const {fileUpdateFlag, setFileUpdateFlag} = useContext(FileUpdateContext);

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        if(!values['presets'].includes('src')){
            prevStep(3);
        }
        else if(values['projectType']!=='cpp'){
            prevStep(2);
        }
        prevStep();
    }
    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        makeNewProject(values, setToastProps, fileUpdateFlag, setFileUpdateFlag);
        nextStep();
        console.log(values);
    }


    return(
        <>  
            <Typography variant="h6" component="h2" align="center" mb={3}>
                    Confirm New Project
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Project Name:" secondary={values['projectName']} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Project Type:" secondary={values['projectType']} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preset Folders:" secondary={values['presets'].toString().split(',').join(', ')} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Source File:" secondary={values['boilerplate']==='py-bp' ? 'main.py w/ boilerplate code' : values['boilerplate']==='py-nobp' ? 'main.py w/o boilerplate code' : values['boilerplate']==='cpp-bp' ? 'main.cpp w/ boilerplate code' : values['boilerplate']==='cpp-nobp' ? 'main.cpp w/o boilerplate code' : 'none'} />
              </ListItem>
            </List>
            <Box justifyContent={'space-between'} display={'flex'} justifyItems={'flex-end'} flexDirection={'row-reverse'} mt={3}>
                <Button disableRipple variant="contained" onClick={next}>Confirm</Button>
                <Button disableRipple variant="contained" onClick={prev}>Back</Button>
            </Box>
        </>
    )
}

export default FormConfirm;