import type { SlotItemProps } from "src/model/response/slot";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Card, Button, Dialog, IconButton, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import slotApi from "src/api/slot";

import { AlertDialog } from "../component/alert-dialog";
import { SelectSlotItem } from "./appointment-slot-item";


export function AppointmentStylistServiceSlot({
  selectedServiceName2,
  selectedStylistName2,
  onClear2,
  viewdone2
}: {
  selectedServiceName2: string | null;
  selectedStylistName2: string | null;
  onClear2: () => void;
  viewdone2: (viewDone2: boolean) => void
}) {

  const [serviceName2, setServiceName2] = useState(selectedServiceName2);
  const [stylistName2, setStylistName2] = useState(selectedStylistName2);
  const [slots2, setSlots2] = useState<SlotItemProps[]>([]);
  const [selectedSlotIds2, setSelectedSlotIds2] = useState<number[]>([]);
  const [unavailableSlotIds2, setUnavailableSlotIds2] = useState<number[]>([]); // New state
  const [selectedDate2, setSelectedDate2] = useState<dayjs.Dayjs | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const serviceDuration2 = parseInt(localStorage.getItem('selectedServiceDuration2') || '1', 10);

  const navigate = useNavigate();

  useEffect(() => {
    if (serviceName2 && selectedDate2) {
      const storedStylistId2 = localStorage.getItem('selectedStylistId2');
      const storedSalonId2 = localStorage.getItem('selectedSalonId2');
      const storedServiceId2 = localStorage.getItem('selectedServiceId2');

      const formattedDate2 = selectedDate2.format('MM-DD-YYYY');

      const fetchSlots = async () => {
        try {
          const response = await slotApi.getSlotByStylistIdSalonIdServiceIdDate(
            storedStylistId2,
            storedSalonId2,
            storedServiceId2,
            formattedDate2
          );
          const slotData: SlotItemProps[] = response?.data;
          setSlots2(slotData);

          // Extract IDs of slots with status == false
          const unavailableIds2 = slotData.filter(slot => !slot.status).map(slot => slot.id);
          setUnavailableSlotIds2(unavailableIds2);
        } catch (error) {
          if (error.message) {
            showAlert(`${error.message} please choose another stylist`);
          }
        }
      };

      fetchSlots();
    }
  }, [serviceName2, selectedDate2]);

  const handleRedirectStylist = () => {
    if (serviceName2) {
      setOpenDeleteDialog(true);
    } else {
      navigate('/select-stylist-2');
    }
  };

  const handleRedirectService = () => {
    if (selectedSlotIds2.length > 0) {
      setOpenDeleteDialog(true);
    } else {
      navigate('/select-service-2');
    }
  };

  const handleSelectDate = (date: dayjs.Dayjs | null) => {
    if (!date) {
      return;
    }

    if (date.isSame(dayjs(), 'day') || date.isBefore(dayjs(), 'day')) {
      showAlert("Date cannot be in the past or today");
      setSelectedDate2(null);
      setSelectedSlotIds2([]);
    } else {
      setSelectedDate2(date);
      localStorage.setItem('selectedDate2', date.format('MM-DD-YYYY'));
    }
  };

  const handleSelectSlot = (id: number) => {
    const updatedSelectedSlotIds = [id];
    const selectedSlotIndex = slots2.findIndex((slot) => slot.id === id);

    for (let i = 1; i < serviceDuration2; i += 1) {
      const nextSlot = slots2[selectedSlotIndex + i];
      if (nextSlot) {
        updatedSelectedSlotIds.push(nextSlot.id);
      }
    }

    if (updatedSelectedSlotIds.some(slotId => unavailableSlotIds2.includes(slotId))) {
      showAlert("Cannot book this slot, as one or more selected slots are unavailable.");
      setSelectedSlotIds2([]);
      return;
    }

    setSelectedSlotIds2(updatedSelectedSlotIds);
    localStorage.setItem('selectedSlotIds2', JSON.stringify(updatedSelectedSlotIds));
    if (serviceName2 && stylistName2 && selectedDate2 && selectedSlotIds2) {
      viewdone2(true);
    }
  };

  const handleDeleteClick = () => {
    if (stylistName2) {
      setOpenDeleteDialog(true);
    }

  };

  const handleConfirmDelete = () => {
    localStorage.removeItem('selectedServiceId2');
    localStorage.removeItem('selectedServiceName2');
    localStorage.removeItem('selectedStylistId2');
    localStorage.removeItem('selectedStylistName2');
    localStorage.removeItem('selectedDate2');
    localStorage.removeItem('selectedSlotIds2');
    localStorage.removeItem('selectedStylistDuration2');
    setServiceName2(null);
    setStylistName2(null);
    setOpenDeleteDialog(false);

    onClear2();

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

  return (
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: 700, position: 'relative' }}>
      <IconButton aria-label="delete" sx={{ position: 'absolute', top: 8, right: 8, color: 'lightgray', '&:hover': { backgroundColor: 'lightgray', color: 'red' } }} onClick={() => handleDeleteClick()}>
        <DeleteIcon />
      </IconButton>

      <Typography variant="h5" mb={2}>1. Select Stylist</Typography>
      <Typography variant="h6" mb={2}>
        {
          stylistName2 ? (
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
                {stylistName2}
              </Link>
            </Card>
          ) : (
            <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-stylist-2')}>
              Choose Stylist
            </Link>
          )
        }
      </Typography>

      {stylistName2 && (
        <>
          <Typography variant="h5" mb={2}>2. Select Stylist</Typography>
          <Typography variant="h6" mb={2}>
            {serviceName2 ? (
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
                  {serviceName2} - Duration: {serviceDuration2} slots
                </Link>
              </Card>
            ) : (
              <Link color="inherit" underline="hover" variant="subtitle1" noWrap sx={{ cursor: 'pointer' }} onClick={() => navigate('/select-service-2')}>
                Choose Service
              </Link>
            )}
          </Typography>
        </>
      )}

      {serviceName2 && (
        <>
          <Typography variant="h5" mb={2}>3. Select Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate2}
              onChange={(date) => handleSelectDate(date)}
              minDate={dayjs()}
              label="Select Date"
              format="DD-MM-YYYY"
              sx={{ width: '100%', marginBottom: 2 }}
            />
          </LocalizationProvider>
        </>
      )}

{serviceName2 && selectedDate2 && (
        <>
          <Typography variant="h5" mb={2}>4. Available Slots</Typography>
          <Box display="flex" flexWrap="wrap">
            {slots2.map((slot) => (
              <SelectSlotItem
                key={slot.id}
                slot={slot}
                selectedSlotIds={selectedSlotIds2}
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