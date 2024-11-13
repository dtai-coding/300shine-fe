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
import { Card, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import slotApi from "src/api/slot";

import { AlertDialog } from "../component/alert-dialog";
import { SelectSlotItem } from "./appointment-slot-item";


export function AppointmentServiceStylistSlot({
  selectedServiceName,
  selectedStylistName,
  onClear,
  viewdone
}: {
  selectedServiceName: string | null;
  selectedStylistName: string | null;
  onClear: () => void;
  viewdone: (viewDone: boolean) => void
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [serviceName, setServiceName] = useState(selectedServiceName);
  const [stylistName, setStylistName] = useState(selectedStylistName);
  const [slots, setSlots] = useState<SlotItemProps[]>([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);
  const [unavailableSlotIds, setUnavailableSlotIds] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const navigate = useNavigate();
  const serviceDuration = parseInt(localStorage.getItem('selectedServiceDuration') || '1', 10);

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
          const slotData: SlotItemProps[] = response?.data;
          setSlots(slotData);

          // Extract IDs of slots with status == false
          const unavailableIds = slotData.filter(slot => !slot.status).map(slot => slot.id);
          setUnavailableSlotIds(unavailableIds);
        } catch (error) {
          if (error.message) {
            showAlert(`${error.message} please choose another stylist`);
          }
        }
      };

      fetchSlots();
    }
  }, [stylistName, selectedDate]);

  // useEffect(() => {
  //   if (selectedDate && selectedSlotIds.length > 0) {
  //     const fetchSlots =() => {

  //     };

  //     fetchSlots();
  //   }
  // }, [selectedSlotIds]);

  const handleSelectSlot = (id: number) => {
    const updatedSelectedSlotIds = [id];
    const selectedSlotIndex = slots.findIndex((slot) => slot.id === id);

    for (let i = 1; i < serviceDuration; i += 1) {
      const nextSlot = slots[selectedSlotIndex + i];
      if (nextSlot) {
        updatedSelectedSlotIds.push(nextSlot.id);
      }
    }

    if (updatedSelectedSlotIds.some(slotId => unavailableSlotIds.includes(slotId))) {
      showAlert("Cannot book this slot, as one or more selected slots are unavailable.");
      setSelectedSlotIds([]);
      return;
    }

    setSelectedSlotIds(updatedSelectedSlotIds);
    localStorage.setItem('selectedSlotIds', JSON.stringify(updatedSelectedSlotIds));
    if (serviceName && stylistName && selectedDate && selectedSlotIds) {
      viewdone(true);
    }
  };

  const handleDeleteClick = () => {
    if (serviceName) {
      setOpenDeleteDialog(true);
    }

  };

  const handleConfirmDelete = () => {
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedSlotIds');
    localStorage.removeItem('selectedStylistDuration');
    setServiceName(null);
    setStylistName(null);
    setOpenDeleteDialog(false);

    onClear();

  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleRedirectService = () => {
    if (stylistName) {
      setOpenDeleteDialog(true);
    } else {
      navigate('/select-service');
    }
  };

  const handleRedirectStylist = () => {
    if (selectedSlotIds.length > 0) {
      setOpenDeleteDialog(true);
    } else {
      navigate('/select-stylist');
    }
  };

  const handleSelectDate = (date: dayjs.Dayjs | null) => {
    if (!date) {
      return;
    }

    if (date.isSame(dayjs(), 'day') || date.isBefore(dayjs(), 'day')) {
      showAlert("Date cannot be in the past or today");
      setSelectedDate(null);
      setSelectedSlotIds([]);
      setSlots([]);
    } else {
      setSelectedDate(date);
      localStorage.setItem('selectedDate', date.format('MM-DD-YYYY'));
    }
  };

  return (
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: 700, position: 'relative' }}>
      <IconButton aria-label="delete" sx={{ position: 'absolute', top: 8, right: 8, color: 'lightgray', '&:hover': { backgroundColor: 'lightgray', color: 'red' } }} onClick={() => handleDeleteClick()}>
        <DeleteIcon />
      </IconButton>

      <Typography variant="h5" mb={2}>1. Select Service</Typography>
      <Typography variant="h6" mb={2}>
        {serviceName ? (
          <Card
            onClick={() => handleRedirectService()}
            sx={{
              cursor: 'pointer',
              height: '30px',
              margin: '18px',
              backgroundColor: '#b3e5fc',
              color: 'black',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: 'palegoldenrod ',
              },
            }}
          >
            <Link color="inherit" marginLeft='20px' underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} >
              {serviceName} - Duration: {serviceDuration} slots
            </Link>
          </Card>
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
              <Card
                onClick={() => handleRedirectStylist()}
                sx={{
                  cursor: 'pointer',
                  height: '30px',
                  margin: '18px',
                  backgroundColor: '#b3e5fc',
                  color: 'black',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'palegoldenrod ',
                  },
                }}
              >
                <Link color="inherit" marginLeft='20px' underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} >
                  {stylistName}
                </Link>
              </Card>
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
              onChange={(date) => handleSelectDate(date)}
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
            This action will clear other selection. Do you want to continue?
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

      <AlertDialog open={alertOpen} message={alertMessage} onClose={handleAlertClose} />

    </Box>
  );
}

