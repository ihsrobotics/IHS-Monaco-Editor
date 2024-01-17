import React from 'react';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { ToastProps } from '../App';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = ToastProps & {
    setOpen: (arg0: ToastProps) => void
}

function Toast({open, severity, message, setOpen}: Props){
    // const [open, setOpen] = useState(true);
    // const handleClick = () => {
    //     setOpen(true);
    // };
    
    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen({open: false, severity: severity, message: message});
    };
    
    return(
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    )
    
}

export default Toast;