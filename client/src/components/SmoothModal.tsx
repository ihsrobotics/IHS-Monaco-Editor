import { SxProps } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1d1d1d',
    boxShadow: 24,
    p: 4,
    color: '#BFC6C8',
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
};
  
interface Props{
    open: boolean,
    setOpen: (arg0: boolean) => void,
    children: ReactNode
}

function SmoothModal({open, setOpen, children}: Props){

    return(
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
                <Box sx={style}>
                    {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    {children}
                </Box>
                {/* <>
                    dsjdsjfakslfj
                </> */}
                
            </Fade>
        </Modal>
    )
}

export default SmoothModal;