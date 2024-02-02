import { useState } from "react";

export interface projectProps {
  projectName: string; // text input
  projectType: "python" | "cpp" | "custom" | ""; // radio group
  presets: string[]; // checkboxes
  boilerplate: "py-bp" | "py-nobp" | "cpp-bp" | "cpp-nobp" | ""; // radio group
  // cpp options
  include: boolean; // checkbox
  links: string[]; // checkbox
  optimization: number; // radio group
}

const INITIAL_STATE: projectProps = {
  projectName: "",
  projectType: "",
  presets: [],
  boilerplate: "",
  // cpp options
  include: true,
  links: ["kipr", "ihsboost"],
  optimization: 3,
};

function useNewProjectForm() {
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<projectProps>(INITIAL_STATE);

  const nextStep = (increment: number = 1) => {
    setStep(step + increment);
  };

  const prevStep = (increment: number = 1) => {
    setStep(step - increment);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (
    prop: "presets" | "links" | "include",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isTrue: boolean = e.target.checked;
    if (prop === "include") {
      state["include"] = isTrue;
      return;
    }
    const attribute: string = e.target.name;
    // basically if its checked then it adds it to the list (if it doesn't already exist)
    // if its not checked then it removes it from the list if needed
    isTrue
      ? state[prop].includes(attribute) || state[prop].push(attribute)
      : state[prop].includes(attribute) &&
        state[prop].splice(state[prop].indexOf(attribute), 1);
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return {step, state, nextStep, prevStep, handleTextChange, handleCheckboxChange, handleRadioChange};
}

export default useNewProjectForm;