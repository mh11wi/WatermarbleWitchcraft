import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Link
} from '@mui/material';


const HelpDialog = (props) => {  
  return (
    <Dialog
      aria-labelledby="help-dialog-title"
      aria-describedby="help-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="help-dialog-title">App Info</DialogTitle>
      <DialogContent id="help-dialog-content" dividers={true} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <DialogContentText>
          This application is a tool to help plan a watermarble manicure.
        </DialogContentText>
        <DialogContentText>
          Start by choosing your nail shape, then up to 8 polish colours, and finally where to dip your nail.
        </DialogContentText>
        <DialogContentText>
          The polishes will be added to a cup one after the other, in the same order as selected, and dragged into the traditional flower design.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 1, flexGrow: 1 }}>
          <Link href="https://mh11wi.github.io/privacy-policy.html">Terms & Privacy Policy</Link>
        </DialogContentText>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
