import { Typography, FormControl, TextField, Box, Button } from "@mui/material";
import { getFile, saveFile } from "../../util/shell";
import { useEffect, useState } from "react";
import { ToastFunction } from "../Toast/context/ToastContext";
import useToastContext from "../Toast/hooks/useToastContext";

interface Props {
  project: string;
  setModalOpen: (arg0: boolean) => void;
}

function ProjectConfigForm({ project, setModalOpen }: Props) {
  const [configs, setConfigs] = useState<{ compile: string; run: string }>({
    compile: "",
    run: "",
  });
  const [configsLoaded, setConfigsLoaded] = useState(false);

  useEffect(() => {
    if (!configsLoaded) {
      getFile(
        project.split("/").slice(0, 2).join("/") + "/.editor/config.json"
      ).then((response) => {
        setConfigs(JSON.parse(response));
        setConfigsLoaded(true);
      });
    }
  }, [configsLoaded, project]);

  const handleCompileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    configs.compile = e.target.value;
  };
  const handleRunChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    configs.run = e.target.value;
  };

  const cancel = () => {
    setModalOpen(false);
  };
  const save = (toast: ToastFunction) => {
    setModalOpen(false);
    try {
      saveFile(
        project.split("/").slice(0, 2).join("/") + "/.editor/config.json",
        JSON.stringify(configs)
      );
      toast(true, "success", "project configs updated");
      // toast(true, 'success', 'project configs updated');
    } catch (error) {
      console.log(error);
      toast(true, "error", error as string);
    }
  };

  const { useToast } = useToastContext();

  return (
    <>
      <Typography variant="h6" component="h2" align="center" mb={3}>
        {project.split("/").slice(1, 2).join("/")} Configs
      </Typography>

      {configsLoaded ? (
        <FormControl>
          <TextField
            fullWidth
            label="compile command"
            onChange={handleCompileChange}
            defaultValue={configs.compile}
            sx={{ mb: 3 }}
            name="compile command"
          />
          <TextField
            fullWidth
            label="run command"
            onChange={handleRunChange}
            defaultValue={configs.run}
            name="run command"
          />
        </FormControl>
      ) : (
        <p>loading...</p>
      )}

      <Box
        justifyContent={"space-between"}
        display={"flex"}
        justifyItems={"flex"}
        flexDirection={"row"}
        mt={3}
      >
        <Button disableRipple variant="contained" onClick={cancel}>
          Cancel
        </Button>
        <Button
          disableRipple
          variant="contained"
          onClick={() => save(useToast)}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default ProjectConfigForm;
