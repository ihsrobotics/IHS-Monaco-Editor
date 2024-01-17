const express = require("express");
const fs = require("fs").promises;
const path = require('path');
const { exec, spawn } = require("child_process");
const cors = require("cors");
const os = require('os');

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());



// directory path of all editor files
const DIRECTORY_PATH = path.join(process.env.HOME, 'Documents', 'IME_files')


process.env.PYTHONUNBUFFERED = '1';

let PY_BOILERPLATE = '';
let CPP_BOILERPLATE = ''; 

async function loadBp(){
    const boilerplate = JSON.parse(await fs.readFile('./server-config.json', 'utf-8'));
    PY_BOILERPLATE = boilerplate.pythonBoilerplate;
    CPP_BOILERPLATE = boilerplate.cppBoilerplate;
}
loadBp();


async function formatFileHierarchy(directoryPath) {
    const fileHierarchy = {};
    // Read the contents of the directory
    try{
        const files = await fs.readdir(directoryPath);
    
        // Iterate over each file in the directory
        for(const file of files){
            const filePath = path.join(directoryPath, file);
            const stat = await fs.stat(filePath);
        
            // Check if the file is a directory
            if (stat.isDirectory()) {
                // Recursively format the subdirectory
                fileHierarchy[file] = {
                    name: file,
                    type: 'directory',
                    ...(await formatFileHierarchy(filePath))
                }
            } else {
                // Format the file information
                fileHierarchy[file] = {
                name: file,
                type: 'file',
                };
            }
        }
    
        return fileHierarchy;
    } catch(error){
        console.error('Error: ', error.message);
        throw error;
    }
}


app.get("/api/getFile", async (req, res) => {
    const encodedFileName = req.query.filename;
    
    if (!encodedFileName) {
        return res.status(400).json({ error: "filename parameter is required" });
    }

    const fileName = decodeURIComponent(encodedFileName);
    
    try { 
        const content = await fs.readFile(path.join(DIRECTORY_PATH, fileName), 'utf-8');
        res.json(content);
    } catch (error) {
        res.status(404).json({ error: "error loading the file" });
    }
});



app.get("/api/getFileHierarchy", async (req, res) => {
    try{
        res.json(await formatFileHierarchy(DIRECTORY_PATH))
    } catch(error){
        res.status(500).json({ error })
    }
});


app.post('/api/shell', (req, res) => {
    const { command } = req.body;
    if(!command){
        return res.status(400).json({error: "command parameter is required"});
    }
    console.log(command)
    exec(command, {cwd: DIRECTORY_PATH}, (error, output) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: error});
        }
        else{
            res.status(200).send('shell command handled successfully');
        }
    });

}); 

app.post('/api/saveFile', async (req, res) => {
    const {fileName, content} = req.body; 
    console.log(fileName)
    console.log(content)
    if(!fileName || !content){
        return res.status(400).json({error: "Filename and content parameter are required"});
    }
    
    await fs.writeFile(path.join(DIRECTORY_PATH, fileName), content, (err) => {
        if(err){
            return res.status(500).json({ error: err});
        }
    });
    res.status(200).send(fileName+" saved successfully")

});

app.post('/api/writeBp', async (req, res) => {
    const {filePath, boilerplate} = req.body;
    if(!filePath || boilerplate===undefined){
        return res.status(400).json({error: "Filename and content parameter are required"});
    }
    if(boilerplate === 'py-bp'){
        await fs.writeFile(path.join(DIRECTORY_PATH, filePath, 'src', 'main.py'), PY_BOILERPLATE, (err) => {
            if(err){
                return res.status(500).json({ error: err});
            } 
        });
        res.status(200).send('success');
    }
    else if(boilerplate === 'py-nobp'){
        await fs.writeFile(path.join(DIRECTORY_PATH, filePath, 'src', 'main.py'), "", (err) => {
            if(err){
                return res.status(500).json({ error: err});
            } 
        });
        res.status(200).send('success');
    }
    else if(boilerplate === 'cpp-bp'){
        await fs.writeFile(path.join(DIRECTORY_PATH, filePath, 'src', 'main.cpp'), CPP_BOILERPLATE, (err) => {
            if(err){
                return res.status(500).json({ error: err});
            } 
        });
        res.status(200).send('success');
    }
    else if(boilerplate === 'cpp-nobp'){
        await fs.writeFile(path.join(DIRECTORY_PATH, filePath, 'src', 'main.cpp'), "", (err) => {
            if(err){
                return res.status(500).json({ error: err});
            } 
        });
        res.status(200).send('success');
    }
});

app.get('/api/getPath', async (req, res) => {
    res.send({user: `${os.userInfo().username}@${os.hostname()}`,home: process.env.HOME, path: DIRECTORY_PATH});
});


app.post('/api/liveShell', (req, res) => {
    const {command, cwd} = req.body;


    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    // need sleep between command and getting directory to stop them from literally colliding with each other
    const childProcess = spawn('bash', ['-c', `"${command} && sleep 0.1 && echo -n '__PATH__:' && pwd"`], {stdio: 'pipe', shell: true, cwd: cwd});
    res.write(JSON.stringify({pid: childProcess.pid})+'\r\n');
    childProcess.stdout.on('data', (data) => {
        const formattedData = data.toString();
        console.log("output:", formattedData);

        if(formattedData.includes('__PATH__')){
            res.write('\r\n'+JSON.stringify({path: formattedData.substring(formattedData.indexOf(':')+1).trim()}));
        }
        // else if(formattedData.includes('cd:') && formattedData.includes()) 
        else{
            res.write('\r\n'+JSON.stringify(formattedData));
        }
    });
    childProcess.stderr.on('data', (data) => {
        const formattedData = data.toString();
        console.log("error:", data.toString());

        if(formattedData.includes('cd:') && formattedData.includes('No such file or directory')){
            res.write('\r\n'+JSON.stringify({path: 'invalid'}));
        }
        res.write('\r\n'+JSON.stringify(data.toString()));
    });
    childProcess.on('close', () => {
        // res.write(JSON.stringify(`Command exited with code ${code}`));
        res.end();
    });
});

function isProcess(pid){
    try{
        process.kill(pid, 0);
        return true;
    } catch(error){
        return false;
    }
}

app.post('/api/kill', (req, res) => {
    const {pid} = req.body;
    console.log("pid to kill", pid)
    isProcess(Number.parseInt(pid)+1) ? process.kill(Number.parseInt(pid)+1, 'SIGINT') : null;
    setTimeout(() => {
        isProcess(Number.parseInt(pid)+1) ? process.kill(Number.parseInt(pid)+1, 'SIGINT') : null;    
    }, 100);
    setTimeout(() => {
        isProcess(Number.parseInt(pid)+1) ? process.kill(Number.parseInt(pid)+1, 'SIGTERM') : null;
    }, 200); 
});

app.listen(port, () => { 
    console.log('Server started on port', port)  
});


// npm run dev