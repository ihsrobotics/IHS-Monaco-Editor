import React from 'react'
import { ToastProps, address } from './App';
import path from 'path-browserify'

export function rename(oldName: string, fileUpdateFlag: boolean, fileUpdateFunction: React.Dispatch<boolean>, setToastProps: React.Dispatch<ToastProps>){
    let newName = prompt("new file name: ")
    if(newName == null){ return; }
    newName = newName.replace(/[^a-zA-Z0-9_\-]/g, '');
    newName = oldName.slice(0, oldName.lastIndexOf('/'))+'/'+newName;
    fetch('http://'+address+':5000/api/shell', 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({command: 'mv '+oldName+' '+newName})}).then(
        response => {
            if(response.status == 200){
                setToastProps({open: true, severity: 'success', message: 'renamed successfully'});
            } else{
                setToastProps({open: true, severity: 'warning', message: 'status '+response.status})
            }
            fileUpdateFunction(!fileUpdateFlag);
        }
    ).catch(error => {
        console.log('Error:', error);
        setToastProps({open: true, severity: 'error', message: error});
    });
}

export function deleteItem(name: string, fileUpdateFlag: boolean, fileUpdateFunction: React.Dispatch<boolean>, setToastProps: React.Dispatch<ToastProps>){
    if(!confirm("delete "+name+"?")){
        return;
    }
    fetch('http://'+address+':5000/api/shell', 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({command: 'rm -rf '+name})}).then(
        response => {
            if(response.status == 200){
                setToastProps({open: true, severity: 'success', message: 'deleted successfully'});
            } else{
                setToastProps({open: true, severity: 'warning', message: 'status '+response.status})
            }
            fileUpdateFunction(!fileUpdateFlag);
        }
    ).catch(error => {
        console.log('Error:', error);
        setToastProps({open: true, severity: 'error', message: error});
    })
}

export async function newFile(name: string, fileUpdateFlag: boolean, fileUpdateFunction?: React.Dispatch<boolean>, setToastProps?: React.Dispatch<ToastProps>, newFileName?: string){
    let fileName = newFileName ? newFileName : prompt("new file name: ");
    if(fileName == null){ return; }
    fileName = fileName.replace(/[^a-zA-Z0-9_\-\.]/g, '');
    await fetch('http://'+address+':5000/api/shell', 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({command: 'touch '+name+'/'+fileName})}).then(
        response => {
            if(response.status == 200){
                setToastProps ? setToastProps({open: true, severity: 'success', message: 'created successfully'}) : null;
            } else{
                setToastProps ? setToastProps({open: true, severity: 'warning', message: 'status '+response.status}) : null;
            }
            fileUpdateFlag !== undefined && fileUpdateFunction ? fileUpdateFunction(!fileUpdateFlag) : null;
        }
    ).catch(error => {
        console.log('Error:', error);
        setToastProps ? setToastProps({open: true, severity: 'error', message: error}) : null;
        throw error;
    })
}

export async function newFolder(parentDirName: string, fileUpdateFlag?: boolean, fileUpdateFunction?: React.Dispatch<boolean>, setToastProps?: React.Dispatch<ToastProps>, newFolderName?: string){
    let folderName = newFolderName ? newFolderName : prompt("new folder name: ");

    if(folderName == null){ return; }
    folderName = folderName.replace(/[^a-zA-Z0-9_\-\.]/g, '');
    await fetch('http://'+address+':5000/api/shell', 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({command: 'mkdir '+parentDirName+(parentDirName==='' ? '' : '/')+folderName})}).then(
        response => {
            if(response.status == 200){
                setToastProps ? setToastProps({open: true, severity: 'success', message: 'created successfully'}) : null;
            } else{
                setToastProps ? setToastProps({open: true, severity: 'warning', message: 'status '+response.status}) : null;
            }
            fileUpdateFlag !== undefined && fileUpdateFunction ? fileUpdateFunction(!fileUpdateFlag) : null;
        }
    ).catch(error => {
        console.log('Error:', error);
        setToastProps ? setToastProps({open: true, severity: 'error', message: error}) : null;
        throw error;
    });
}

export async function getFile(path: string){
    const response = await fetch('http://'+address+':5000/api/getFile?filename='+path, {method: 'GET'});
    const data = await response.json();
    return data;
}

export async function saveFile(fileName: string, fileContent: string, setToastProps?: React.Dispatch<ToastProps>){
    console.log(fileName);
    await fetch('http://'+address+':5000/api/saveFile', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({fileName: fileName, content: fileContent})
        }
    ).then(
        response => {
            if(response.status == 200 || response.status == 204){
                console.log("success");
                setToastProps ? setToastProps({open: true, severity: 'success', message: fileName.split('/').slice(-1).toString()+' saved successfully'}) : null;
            } else{
                setToastProps ? setToastProps({open: true, severity: 'warning', message: 'status '+response.status}) : null
            }
        }
    ).catch(error => {
        console.log('Error:', error);
        setToastProps ? setToastProps({open: true, severity: 'error', message: error}) : null;
        throw error;
    });
}

export async function command(command: string, setToastProps?: React.Dispatch<ToastProps>, successMessage?: string){   
    try{
        const response = await fetch('http://'+address+':5000/api/shell', 
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({command: command})
            }
        );
        if(response.status == 200){
            setToastProps && successMessage ? setToastProps({open: true, severity: 'success', message: successMessage}) : null;
        } else{
            setToastProps && successMessage ? setToastProps({open: true, severity: 'warning', message: 'status '+response.status+' '+response.json()}) : null;
        }
        return response.json();
    } catch(error){
        setToastProps && successMessage ? setToastProps({open: true, severity: 'error', message: (error as string)}) : null;
        throw error;
    }
}

const keyEnterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
});

export async function compileProject(baseDir: string, project: string, setToastProps: React.Dispatch<ToastProps>){
    const config = JSON.parse(await getFile(project.split('/').slice(0, 2).join('/')+"/.editor/config.json"));
    if(config['compile'].trim() === ''){
        setToastProps({open: true, severity: 'error', message: 'compile command not set'});
        return;
    }
    document.getElementById('terminalInput')!.innerText = `cd ${path.join(baseDir, project.split('/').slice(0, 2).join('/'))} && ${config['compile']}`;
    document.getElementById('terminalInput')?.dispatchEvent(keyEnterEvent);
}

export async function runProject(baseDir: string, project: string, setToastProps: React.Dispatch<ToastProps>){
    const config = await JSON.parse(await getFile(project.split('/').slice(0, 2).join('/')+"/.editor/config.json"));
    if(config['run'].trim() === ''){
        setToastProps({open: true, severity: 'error', message: 'run command not set'});
        return;
    }
    document.getElementById('terminalInput')!.innerText = `cd ${path.join(baseDir, project.split('/').slice(0, 2).join('/'))} && ${config['run']}`;
    document.getElementById('terminalInput')?.dispatchEvent(keyEnterEvent);
}
export async function stopRunProject(pid: number){
    keyInt(pid);
}

const isValidJSON = (str: string) => { 
    try { 
        const parsed = JSON.parse(str); 
        return (typeof parsed === 'object' && parsed !== null) ? parsed : null;
    } 
    catch (e) { 
        return null; 
    } 
};

export async function liveShell(command: string, cwd: string, setPID: React.Dispatch<number>, setIsFinished: React.Dispatch<boolean>, oldTerminalOutput: [string, string, string][], newTerminalOutput: [string, string, string], setOutput: React.Dispatch<[string, string, string][]>, setCurrentDir: React.Dispatch<string>){
    const response = await fetch('http://'+address+':5000/api/liveShell',
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({command: command, cwd: cwd})
        }
    );
    const reader = response.body?.getReader();
    let ret = '';
    while(true){
        const { done, value } = await reader?.read() as ReadableStreamReadResult<Uint8Array>;

        if (done) {
            console.log("done");
            setIsFinished(true);
            // wait for the rerender to finish before setting the focus
            setTimeout(() => {
                document.getElementById('terminalInput')?.focus()
            }, 100);
            break;
        }

        // Handle the received data (replace this with your actual handling logic)
        const decodedValue = new TextDecoder().decode(value);
        console.log("decoded value:", decodedValue);
        decodedValue.split('\r\n').forEach((value) => {
            const parsedObject = isValidJSON(value);
            if(parsedObject !== null && parsedObject['pid'] != undefined){
                console.log("pid found:", parsedObject['pid']);
                setPID(Number.parseInt(parsedObject['pid'])+1);
            }
            else if(parsedObject !== null && parsedObject['path'] != undefined){
                console.log("path found:", parsedObject['path']);
                parsedObject.path !== 'invalid' ? setCurrentDir(parsedObject['path']) : null;
                console.log('set current dir', parsedObject['path']);
            }
            else if(value !== '') {
                console.log("regular value:", value)
                ret+=value.substring(1, value.length-1);
                setOutput([...oldTerminalOutput.slice(0, oldTerminalOutput.length-1), [newTerminalOutput[0], newTerminalOutput[1], newTerminalOutput[2]+ret]]);
                document.querySelector('.app-bottomBar-content')!.scrollTop = document.querySelector('.app-bottomBar-content')!.scrollHeight;
            }
        });

    }
}

export function keyInt(pid: number | undefined){
    if(pid == undefined) return;
    fetch('http://'+address+':5000/api/kill', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({pid: pid})
    });
}