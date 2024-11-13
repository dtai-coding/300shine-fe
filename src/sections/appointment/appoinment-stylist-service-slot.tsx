import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

import { SlotItemProps } from "src/model/response/slot";
import { AlertDialog } from "../component/alert-dialog";




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

  const handleRedirectStylist = () => {
    if (selectedSlotIds2.length > 0) {
      setOpenDeleteDialog(true);
    } else {
      navigate('/select-stylist-2');
    }
  };

  const handleDeleteClick = () => {
    if (stylistName2) {
      setOpenDeleteDialog(true);
    }

  };

  const handleConfirmDelete = () => {
    // localStorage.removeItem('selectedServiceId');
    // localStorage.removeItem('selectedServiceName');
    // localStorage.removeItem('selectedStylistId');
    // localStorage.removeItem('selectedStylistName');
    // localStorage.removeItem('selectedDate');
    // localStorage.removeItem('selectedSlotIds');
    // localStorage.removeItem('selectedStylistDuration');
    // setServiceName(null);
    // setStylistName(null);
    setOpenDeleteDialog(false);

    // onClear();

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
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: 700 }}>
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