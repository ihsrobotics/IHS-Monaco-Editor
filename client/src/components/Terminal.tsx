import { useEffect, useState } from "react";
import './Terminal.css'
import path from 'path-browserify'
import { keyInt, liveShell } from "../shell";

interface Props{
    isFinished: boolean,
    setIsFinished: (arg0: boolean) => void,
    PID: number | undefined,
    setPID: (arg0: number) => void
}

function Terminal({isFinished, setIsFinished, PID, setPID}: Props){
    const [terminalCommands, setTerminalCommands] = useState<[string, string, string][]>([]);
    const [home, setHome] = useState('');
    const [currentDir, setCurrentDir] = useState('');
    const [currentCommand, setCurrentCommand] = useState<string>('');
    const [isTerminalLoaded, setIsTerminalLoaded] = useState(false);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(0);
    const [user, setUser] = useState('');

    const createPrompt = (pwd: string)  => {
        return (
            <><span className="user">{user}</span>:<span className="path">{pwd.includes(home) ? '~/'+path.relative(home, pwd) : pwd}</span>$&nbsp;</>
        )
    }

    const createCommand = ([pwd, command, response]: [string, string, string], index: number) => {
        return (
            <>
                <div key={index}>
                    {createPrompt(pwd)}
                    <span>{command}</span>
                </div> 
                <div className="response">{response.split(String.raw`\n`).map((line, index) => <div key={index}>{line}</div>  )}</div>
            </>
        )
    }

    const handleKeyDown = async (e: KeyboardEvent) => {
        if(e.key == 'Enter'){
            e.preventDefault();
            // remove ascii 10
            const input = (e.target as HTMLDivElement).innerText.replace(/\n/g, '');

            // handle cd
            // if(input.indexOf('cd ') !== -1){
            //     // absolute path
            //     if(input.substring(input.indexOf('cd ')+3).split(' ')[0][0]==='/'){
            //         setCurrentDir(input.substring(input.indexOf('cd ')+3).split(' ')[0]);
            //     } 
            //     // home path
            //     else if(input.substring(input.indexOf('cd ')+3).split(' ')[0][0] === '~'){
            //         setCurrentDir(path.join(home, input.substring(input.indexOf('cd ')+3).split(' ')[0].slice(1)))
            //     }
            //     // relative path
            //     else{
            //         setCurrentDir(path.join(currentDir, input.substring(input.indexOf('cd ')+3).split(' ')[0]))
            //     }
            // }
            

            // handle clear
            if(input === 'clear'){
                setTerminalCommands([]);
                setCommandHistory([...commandHistory, input]);
                setCommandHistoryIndex(commandHistory.length+1);
                (e.target as HTMLDivElement).innerText = '';
                return;
            }

            // handle commands
            if(input.trim().length > 0){
                console.log("command:", input);
                setCommandHistory([...commandHistory, input]);
                setCommandHistoryIndex(commandHistory.length+1);
                // setTerminalCommands([...terminalCommands, [currentDir, input, '']]);
                terminalCommands.push([currentDir, input, ''])
                setIsFinished(false);
                liveShell(input, currentDir, setPID, setIsFinished, terminalCommands, [currentDir, input, ''], setTerminalCommands, setCurrentDir);
                
            }

            // empty command
            else{
                setTerminalCommands([...terminalCommands, [currentDir, input, '']]);
            }



            // clear the input box
            (e.target as HTMLDivElement).innerText = '';
            document.querySelector('.app-bottomBar-content')!.scrollTop = document.querySelector('.app-bottomBar-content')!.scrollHeight;
            
        }
        else if(e.key == 'ArrowUp'){
            e.preventDefault();
            commandHistory[commandHistoryIndex-1] ? ( (e.target as HTMLDivElement).innerText = commandHistory[commandHistoryIndex-1], setCommandHistoryIndex(commandHistoryIndex-1) ): null;
        }
        else if(e.key == 'ArrowDown'){
            e.preventDefault();
            commandHistory[commandHistoryIndex+1] ? ( (e.target as HTMLDivElement).innerText = commandHistory[commandHistoryIndex+1], setCommandHistoryIndex(commandHistoryIndex+1) ):( (e.target as HTMLDivElement).innerText = currentCommand, setCommandHistoryIndex(commandHistoryIndex < commandHistory.length ? commandHistoryIndex+1 : commandHistory.length));
        } 
        
        
        else if(e.key == 'Control'){
            console.log(currentDir)
            console.log(terminalCommands);
        }
        
        else{
            setCurrentCommand( (e.target as HTMLDivElement).innerText.replace(/\n/g, '') + (e.key.length===1 ? e.key : ''));
        }
    }

    const handleWindowKeyDown = (e: KeyboardEvent) => {
        // keyboard interrupt
        if(e.ctrlKey && e.code === 'KeyC' && !isFinished){
            e.preventDefault();
            console.log("keyint");
            keyInt(PID);
        }
        // alternate copy
        else if(e.shiftKey && e.ctrlKey && e.code === 'KeyC'){
            console.log("shift copy")
            e.preventDefault();
            copySelectedText();
        }
    }


    useEffect(() => {
        document.addEventListener('keydown', handleWindowKeyDown);
        document.getElementById('terminalInput')?.addEventListener('keydown', handleKeyDown);
        if(!isTerminalLoaded)
            fetch('http://localhost:5000/api/getPath', {method: 'GET'}).then(
                response => response.json()
            ).then(
                data => {
                    setCurrentDir(data['path']); 
                    setHome(data['home']); 
                    setUser(data['user']); 
                    setIsTerminalLoaded(true); 
            }
            )

        return () => {
            document.removeEventListener('keydown', handleWindowKeyDown);
            document.getElementById('terminalInput')?.removeEventListener('keydown', handleKeyDown);
        }
    });
    

    return(
        <div >
            {terminalCommands.map((command, index) => createCommand(command, index))}
            
            <div className="currentCommand" onClick={() => document.getElementById('terminalInput')?.focus()} style={{visibility: isFinished ? 'visible' : 'hidden'}}>
                {createPrompt(currentDir)}
                <div contentEditable="true" id="terminalInput" spellCheck={"false"} />
            </div> 

            
        </div>
    )
}

export default Terminal;

function copySelectedText() {
    const selectedText = window.getSelection()?.toString();
    if(selectedText){
        navigator.clipboard.writeText(selectedText)
    }
}
