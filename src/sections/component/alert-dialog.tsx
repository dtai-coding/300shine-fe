import { Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function AlertDialog({ open, message, onClose }: AlertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Notification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
