import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { projectProps } from "../hooks/useNewProjectForm";

interface Props {
  prevStep: (arg0?: number) => void;
  nextStep: (arg0?: number) => void;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: projectProps;
}

function FormProjectSource({
  prevStep,
  nextStep,
  handleRadioChange,
  values,
}: Props) {
  if (
    !values["presets"].includes("src") ||
    values["projectType"] === "custom"
  ) {
    nextStep();
  }

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    prevStep();
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    if (values["boilerplate"] === "") return;
    nextStep();
  };

  return (
    <>
      <Typography variant="h6" component="h2" align="center" mb={3}>
        Project Source File
      </Typography>
      <FormControl>
        <FormLabel id="project-boilerplate-label" required>
          Project Source File
        </FormLabel>
        <RadioGroup
          aria-labelledby="project-boilerplate-label"
          name="boilerplate"
          onChange={handleRadioChange}
          value={values["boilerplate"]}
        >
          {values["projectType"] === "python" ? (
            <>
              <FormControlLabel
                value="py-bp"
                control={<Radio disableRipple />}
                label="main.py with boilerplate code"
              />
              <FormControlLabel
                value="py-nobp"
                control={<Radio disableRipple />}
                label="main.py without boilerplate code"
              />
            </>
          ) : (
            <>
              <FormControlLabel
                value="cpp-bp"
                control={<Radio disableRipple />}
                label="main.cpp with boilerplate code"
              />
              <FormControlLabel
                value="cpp-nobp"
                control={<Radio disableRipple />}
                label="main.cpp without boilerplate code"
              />
            </>
          )}
        </RadioGroup>
      </FormControl>
      <Box
        justifyContent={"space-between"}
        display={"flex"}
        justifyItems={"flex-end"}
        flexDirection={"row-reverse"}
        mt={3}
      >
        <Button disableRipple variant="contained" onClick={next}>
          Next
        </Button>
        <Button disableRipple variant="contained" onClick={prev}>
          Back
        </Button>
      </Box>
    </>
  );
}

export default FormProjectSource;
