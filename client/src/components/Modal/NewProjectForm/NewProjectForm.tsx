import FormProjectName from "./NewProjectFormSteps/FormProjectName";
import FormProjectPresets from "./NewProjectFormSteps/FormProjectPresets";
import FormProjectSource from "./NewProjectFormSteps/FormProjectSource";
import FormProjectCppOptions from "./NewProjectFormSteps/FormProjectCppOptions";
import FormConfirm from "./NewProjectFormSteps/FormConfirm";
import useNewProjectForm from "./useNewProjectForm";

interface Props {
  setModalOpen: (arg0: boolean) => void;
}

function NewProjectForm({ setModalOpen }: Props) {
  const {
    step,
    nextStep,
    prevStep,
    state,
    handleTextChange,
    handleRadioChange,
    handleCheckboxChange,
  } = useNewProjectForm();

  switch (step) {
    case 1:
      return (
        <FormProjectName
          nextStep={nextStep}
          handleTextChange={handleTextChange}
          handleRadioChange={handleRadioChange}
          values={state}
        />
      );
    case 2:
      return (
        <FormProjectPresets
          prevStep={prevStep}
          nextStep={nextStep}
          handleCheckboxChange={handleCheckboxChange}
          values={state}
        />
      );
    case 3:
      return (
        <FormProjectSource
          prevStep={prevStep}
          nextStep={nextStep}
          handleRadioChange={handleRadioChange}
          values={state}
        />
      );
    case 4:
      return (
        <FormProjectCppOptions
          prevStep={prevStep}
          nextStep={nextStep}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioChange={handleRadioChange}
          values={state}
        />
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
