import type { SlotItemProps } from "src/model/response/slot";

import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import slotApi from "src/api/slot";

import { SelectSlotItem } from "./appointment-slot-item";


export function AppointmentServiceStylistSlot({
  selectedServiceName,
  selectedStylistName,
  onClear
}: {
  selectedServiceName: string | null;
  selectedStylistName: string | null;
  onClear: () => void;
}) {
  const [serviceName, setServiceName] = useState(selectedServiceName);
  const [stylistName, setStylistName] = useState(selectedStylistName);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [slots, setSlots] = useState<SlotItemProps[]>([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);  // Updated to handle multiple slots
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const navigate = useNavigate();

  const serviceDuration = parseInt(localStorage.getItem('selectedServiceDuration') || '1', 10);  // Add radix

  useEffect(() => {
    if (stylistName && selectedDate) {
      const storedStylistId = localStorage.getItem('selectedStylistId');
      const storedSalonId = localStorage.getItem('selectedSalonId');
      const storedServiceId = localStorage.getItem('selectedServiceId');

      const formattedDate = selectedDate.format('MM-DD-YYYY');

      const fetchSlots = async () => {
        try {
          const response = await slotApi.getSlotByStylistIdSalonIdServiceIdDate(
            storedStylistId,
            storedSalonId,
            storedServiceId,
            formattedDate
          );
          const slotData = response?.data;
          setSlots(slotData);
        } catch (error) {
          alert(`${error.message  } please choose another stylist`);
          console.error('Failed to fetch slot:', error);
        }
      };

      fetchSlots();
    }
  }, [stylistName, selectedDate]);

  const handleSelectSlot = (id: number) => {
    const updatedSelectedSlotIds = [id]; 

    const selectedSlotIndex = slots.findIndex((slot) => slot.id === id);

    for (let i = 1; i < serviceDuration; i += 1) {  
      const nextSlot = slots[selectedSlotIndex + i];
      if (nextSlot) {
        updatedSelectedSlotIds.push(nextSlot.id);
      }
    }

    setSelectedSlotIds(updatedSelectedSlotIds);
    localStorage.setItem('selectedSlotIds', JSON.stringify(updatedSelectedSlotIds));
    console.log(updatedSelectedSlotIds);
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
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: 700, position: 'relative' }}>
      <IconButton aria-label="delete" sx={{ position: 'absolute', top: 8, right: 8, color: 'lightgray' }} onClick={() => setOpenDeleteDialog(true)}>
        <DeleteIcon />
      </IconButton>

      <Typography variant="h5" mb={2}>1. Select Service</Typography>
      <Typography variant="h6" mb={2}>
        {serviceName ? (
          <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-service')}>
            {serviceName}
          </Link>
        ) : (
          <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-service')}>
            Choose Service
          </Link>
        )}
      </Typography>

      {serviceName && (
        <>
          <Typography variant="h5" mb={2}>2. Select Stylist</Typography>
          <Typography variant="h6" mb={2}>
            {stylistName ? (
              <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-stylist')}>
                {stylistName}
              </Link>
            ) : (
              <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-stylist')}>
                Choose Stylist
              </Link>
            )}
          </Typography>
        </>
      )}

      {stylistName && (
        <>
          <Typography variant="h5" mb={2}>3. Select Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={dayjs()}
              label="Select Date"
              format="DD-MM-YYYY"
              sx={{ width: '100%', marginBottom: 2 }}
            />
          </LocalizationProvider>
        </>
      )}

      {stylistName && selectedDate && (
        <>
          <Typography variant="h5" mb={2}>4. Available Slots</Typography>
          <Box display="flex" flexWrap="wrap">
            {slots.map((slot) => (
              <SelectSlotItem
                key={slot.id}
                slot={slot}
                selectedSlotIds={selectedSlotIds}
                onSelect={handleSelectSlot}
              />
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
