import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { HomeContent } from 'src/layouts/home';

import { AppointmentSalon } from "../appointmet-salon";
import { AppointmentStylistServiceSlot } from "../appoinment-stylist-service-slot";
import { AppointmentServiceStylistSlot } from "../appointment-service-stylist-slot";


export function AppointmentView() {
  const [salonId, setSalonId] = useState<number | null>(null);
  const [salonAddress, setSalonAddress] = useState<string | null>(null);

  const [serviceId, setServiceId] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [serviceDuration, setServiceDuration] = useState<number | null>(null);

  const [stylistId, setStylistId] = useState<number | null>(null);
  const [stylistName, setStylistName] = useState<string | null>(null);

  const [date, setDate] = useState<string | null>(null);

  const [slotIds, setSlotId] = useState<number[]>([]);

  const [viewChoice, setViewChoice] = useState<string | null>(null);
  const [openBackDialog, setOpenBackDialog] = useState<boolean>(false);
  const [viewDone, setViewDone] = useState<boolean>(false);

  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const storedSalonAddress = localStorage.getItem('selectedSalonAddress');

    const storedServiceId = localStorage.getItem('selectedServiceId');
    const storedServiceName = localStorage.getItem('selectedServiceName');
    const storedServiceDuration = localStorage.getItem('selectedServiceDuration');

    const storedStylistId = localStorage.getItem('selectedStylistId');
    const storedStylistName = localStorage.getItem('selectedStylistName');

    const storedDate = localStorage.getItem('selectedDate');

    const storedSlotIds = localStorage.getItem('selectedSlotIds');

    const storedViewChoice = localStorage.getItem('viewChoice');

    if (storedSalonId) {
      setSalonId(Number(storedSalonId));
      setSalonAddress(storedSalonAddress);
    }
    if (storedViewChoice) {
      setViewChoice(storedViewChoice);
    }
    if (storedServiceId) {
      setServiceId(Number(storedServiceId));
      setServiceName(storedServiceName);
      setServiceDuration(Number(storedServiceDuration));

    }
    if (storedStylistId) {
      setStylistId(Number(storedStylistId));
      setStylistName(storedStylistName);
    }
    if (storedDate) {
      setDate(storedDate);
    }
    if (storedSlotIds) {
      setSlotId([Number(storedSlotIds)]);
    }
    console.log(`salon ${storedSalonId}`);
    console.log(`service ${storedServiceId}`);
    console.log(`stylist ${storedStylistId}`);
    console.log(`date ${storedDate}`);
    console.log(`slot ${storedSlotIds}`);
  }, []);

  const handleViewChoice = (choice: string) => {
    setViewChoice(choice);
    localStorage.setItem('viewChoice', choice);
  };

  const handleBack = () => {
    if (serviceId) {
      setOpenBackDialog(true);
    } else {
      handleViewChoice('back');
    }
  };

  const handleConfirmBack = () => {
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedSlotIds');
    localStorage.removeItem('selectedStylistDuration');
    setServiceId(null);
    setServiceName(null);
    setStylistId(null);
    setStylistName(null);
    setDate(null);
    setSlotId([]);
    setServiceDuration(null)

    setOpenBackDialog(false);
    handleViewChoice('back');
    handleViewDone(false);
  };

  const handleCancelBack = () => {
    setOpenBackDialog(false);
  };

  const clearServiceAndStylist = () => {
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedSlotIds');
    localStorage.removeItem('selectedStylistDuration');
    setServiceId(null);
    setServiceName(null);
    setStylistId(null);
    setStylistName(null);
    setDate(null);
    setSlotId([]);
    setServiceDuration(null)
    handleViewDone(false);
  };

  const handleViewDone = (done: boolean) => {
    setViewDone(done);
};

  return (
    <HomeContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h2" flexGrow={1}>
          Make Appointment
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 700, padding: 2, boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h3" flexGrow={1} textAlign="center" color='seagreen  '>
          Customize Your Appointment
        </Typography>

            <AppointmentSalon selectedSalonAddress={salonAddress} />

            {salonId !== null && (viewChoice === null || viewChoice === 'back') && (
              <>
                <Button onClick={() => handleViewChoice('service')} sx={{ fontSize: '18px', '&:hover': { color: '#0755bb' } }}>
                  Choose Service
                </Button>
                <Button onClick={() => handleViewChoice('stylist')} sx={{ fontSize: '18px', '&:hover': { color: '#0755bb' } }}>
                  Choose Stylist
                </Button>
              </>
            )}

            {viewChoice === 'service' && salonId !== null && (
              <AppointmentServiceStylistSlot
                selectedServiceName={serviceName}
                selectedStylistName={stylistName}
                onClear={clearServiceAndStylist} 
                viewdone={handleViewDone}
              />
            )}

            {viewChoice === 'stylist' && salonId !== null && <AppointmentStylistServiceSlot />}
            {/* 
            {serviceName !== null && stylistName !== null && (
              <Link marginLeft={1}>
                + Choose other service
              </Link>
            )} */}

            { viewDone && (
              <Button
                // onClick={handleBack}
                sx={{
                  fontSize: '18px',
                  color: 'white',
                  backgroundColor: 'mediumseagreen   ',
                  '&:hover': { backgroundColor: 'lightgray', color: 'black' }
                }}
              >
                Done
              </Button>
            )}

            {salonId !== null && (viewChoice === 'service' || viewChoice === 'stylist') && (
              <Button
                onClick={handleBack}
                sx={{
                  fontSize: '18px',
                  color: 'lightgray',
                  '&:hover': { backgroundColor: 'lightgray', color: 'black' }
                }}
              >
                Back
              </Button>
            )}

          </Box>
        </Card>
      </Box>

      {/* Back confirmation dialog */}
      <Dialog open={openBackDialog} onClose={handleCancelBack}>
        <DialogTitle>Confirm Back</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Going back will clear your current service selection. Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelBack} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBack} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </HomeContent>
  );
}


