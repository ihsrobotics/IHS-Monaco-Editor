import { useState } from "react";
import FormProjectName from "./NewProjectFormSteps/FormProjectName";
import FormProjectPresets from "./NewProjectFormSteps/FormProjectPresets";
import FormProjectSource from "./NewProjectFormSteps/FormProjectSource";
import FormProjectCppOptions from "./NewProjectFormSteps/FormProjectCppOptions";
import FormConfirm from "./NewProjectFormSteps/FormConfirm";

export interface projectProps{
    projectName: string, // text input
    projectType: ('python' | 'cpp' | 'custom' | ''), // radio group
    presets: string[], // checkboxes
    boilerplate: ('py-bp' | 'py-nobp' | 'cpp-bp' | 'cpp-nobp' | ''), // radio group
    // cpp options
    include: boolean, // checkbox
    links: string[], // checkbox
    optimization: number // radio group
}

const INITIAL_STATE: projectProps = {
    projectName: '',
    projectType: '',
    presets: [],
    boilerplate: '',
    // cpp options
    include: true, 
    links: ['kipr', 'ihsboost'], 
    optimization: 3
}

interface Props{
    setModalOpen: (arg0: boolean) => void,
}

function NewProjectForm({ setModalOpen }: Props ){
    const [step, setStep] = useState<number>(1);
    const [state, setState] = useState<projectProps>(INITIAL_STATE)


    const nextStep = (steps:number=1) => {
        setStep(step+steps);
    }
    const prevStep = (steps:number=1) => {
        setStep(step-steps);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleCheckboxChange = (prop: ("presets" | "links" | "include"), e: React.ChangeEvent<HTMLInputElement>) => {
        let isTrue: boolean = e.target.checked;
        if(prop==="include"){ 
            state["include"] = isTrue;
            return;
        }
        let attribute: string = e.target.name;
        // basically if its checked then it adds it to the list (if it doesn't already exist)
        // if its not checked then it removes it from the list if needed
        isTrue ? state[prop].includes(attribute) || state[prop].push(attribute) : state[prop].includes(attribute) && state[prop].splice(state[prop].indexOf(attribute), 1);
    }
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    switch(step){
        case 1:
            return (
                <FormProjectName nextStep={nextStep} handleTextChange={handleTextChange} handleRadioChange={handleRadioChange} values={state}/>
            );
        case 2:
            return (
                <FormProjectPresets prevStep={prevStep} nextStep={nextStep} handleCheckboxChange={handleCheckboxChange} values={state} />
            );
        case 3: 
            return (
                <FormProjectSource prevStep={prevStep} nextStep={nextStep} handleRadioChange={handleRadioChange} values={state} />
            );
        case 4:
            return (
                <FormProjectCppOptions prevStep={prevStep} nextStep={nextStep} handleCheckboxChange={handleCheckboxChange} handleRadioChange={handleRadioChange} values={state} />
            );
        case 5:
            return (
                <FormConfirm prevStep={prevStep} nextStep={nextStep} values={state} />
            );
        case 6:
            setModalOpen(false);
    }
}

export default NewProjectForm;