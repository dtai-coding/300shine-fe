import { useEffect, useState } from "react";
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

import slotApi from "src/api/slot";

import { SlotItemProps } from "src/model/response/slot";

import { SelectSlotItem } from "./appointment-slot-item";


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
  const [slots, setSlots] = useState<SlotItemProps[]>([]);

  useEffect(() => {
    if (stylistName) { // Only fetch slots if stylistName is not null
      const storedStylistId = localStorage.getItem('selectedStylistId');
      const storedSalonId = localStorage.getItem('selectedSalonId');
      const storedServiceId = localStorage.getItem('selectedServiceId');
      const date = '11-11-2024';
  
      const fetchSlots = async () => {  
        try {
          const response = await slotApi.getSlotByStylistIdSalonIdServiceIdDate(storedStylistId, storedSalonId, storedServiceId, date);
          const slotData = response?.data; 
          setSlots(slotData); 
          console.log('Successfully fetched slot:', slotData);
        } catch (error) {
          console.error('Failed to fetch slot:', error);
        }
      };
  
      fetchSlots();
    }
  }, [stylistName]);
  

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

    onClear();
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
      {stylistName !== null && (
        <>
          <Typography variant="h5" mb={2}>
            3. Available Slots
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {slots.map((slot) => (
              <SelectSlotItem key={slot.id} slot={slot} />
            ))}
          </Box>
        </>
      )}
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
