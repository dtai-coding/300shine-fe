import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export function AppointmentServiceStylistSlot({
  selectedServiceName,
  selectedStylistName,
  onClear
}: {
  selectedServiceName: string | null,
  selectedStylistName: string | null,
  onClear: () => void
}) {
  const [serviceName, setServiceName] = useState(selectedServiceName);
  const [stylistName, setStylistName] = useState(selectedStylistName);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleRedirectService = () => {
    navigate('/select-service');
  };

  const handleRedirectStylist = () => {
    navigate('/select-stylist');
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    
    setServiceName(null);
    setStylistName(null);
    setOpenDeleteDialog(false);

    onClear(); // Call the onClear callback here to update the parent state
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        maxWidth: 700,
        position: 'relative'
      }}
    >
      <IconButton
        aria-label="delete"
        sx={{ position: 'absolute', top: 8, right: 8, color: 'lightgray' }}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </IconButton>

      <Typography variant="h5" mb={2}>
        1. Select Service
      </Typography>
      <Typography variant="h6" mb={2}>
        {serviceName ? (
          <Link
            color="inherit"
            underline="hover"
            variant="subtitle1"
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={handleRedirectService}
          >
            {serviceName}
          </Link>
        ) : (
          <Link
            color="inherit"
            underline="hover"
            variant="subtitle1"
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={handleRedirectService}
          >
            Choose Service
          </Link>
        )}
      </Typography>

      {serviceName !== null && (
        <>
          <Typography variant="h5" mb={2}>
            2. Select Stylist
          </Typography>
          <Typography variant="h6" mb={2}>
            {stylistName ? (
              <Link
                color="inherit"
                underline="hover"
                variant="subtitle1"
                noWrap
                sx={{ cursor: 'pointer' }}
                onClick={handleRedirectStylist}
              >
                {stylistName}
              </Link>
            ) : (
              <Link
                color="inherit"
                underline="hover"
                variant="subtitle1"
                noWrap
                sx={{ cursor: 'pointer' }}
                onClick={handleRedirectStylist}
              >
                Choose Stylist
              </Link>
            )}
          </Typography>
        </>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting the service will clear both the service and stylist selection. Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
