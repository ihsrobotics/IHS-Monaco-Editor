import { SxProps } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

const style: SxProps = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#1d1d1d",
  boxShadow: 24,
  p: "48px",
  color: "#BFC6C8",
  borderRadius: 2,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

interface Props {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  children: ReactNode;
}

function SmoothModal({ open, setOpen, children }: Props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 50,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}

export default SmoothModal;
