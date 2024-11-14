import type { PaymentItemProps } from "src/model/response/payment";
import type { AppointmentProps } from "src/model/request/create-appointment";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import appointmentApi from "src/api/appointment";

import { AlertDialog } from "src/sections/component/alert-dialog";

import { AppointmentSalon } from "../appointmet-salon";
import { AppointmentStylistServiceSlot } from "../appoinment-stylist-service-slot";
import { AppointmentServiceStylistSlot } from "../appointment-service-stylist-slot";

export function AppointmentView() {
  const [salonId, setSalonId] = useState<number | null>(null);
  const [salonAddress, setSalonAddress] = useState<string | null>(null);

  const [serviceId, setServiceId] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [serviceDuration, setServiceDuration] = useState<number | null>(null);
  const [serviceId2, setServiceId2] = useState<number | null>(null);
  const [serviceName2, setServiceName2] = useState<string | null>(null);
  const [serviceDuration2, setServiceDuration2] = useState<number | null>(null);

  const [stylistId, setStylistId] = useState<number | null>(null);
  const [stylistName, setStylistName] = useState<string | null>(null);
  const [stylistId2, setStylistId2] = useState<number | null>(null);
  const [stylistName2, setStylistName2] = useState<string | null>(null);

  const [date, setDate] = useState<string | null>(null);
  const [date2, setDate2] = useState<string | null>(null);

  const [slotIds, setSlotId] = useState<number[]>([]);
  const [slotIds2, setSlotId2] = useState<number[]>([]);

  const [viewChoice, setViewChoice] = useState<string | null>(null);
  const [openBackDialog, setOpenBackDialog] = useState<boolean>(false);
  const [viewDone, setViewDone] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const storedSalonAddress = localStorage.getItem('selectedSalonAddress');

    const storedServiceId = localStorage.getItem('selectedServiceId');
    const storedServiceName = localStorage.getItem('selectedServiceName');
    const storedServiceDuration = localStorage.getItem('selectedServiceDuration');
    const storedServiceId2 = localStorage.getItem('selectedServiceId2');
    const storedServiceName2 = localStorage.getItem('selectedServiceName2');
    const storedServiceDuration2 = localStorage.getItem('selectedServiceDuration2');

    const storedStylistId = localStorage.getItem('selectedStylistId');
    const storedStylistName = localStorage.getItem('selectedStylistName');
    const storedStylistId2 = localStorage.getItem('selectedStylistId2');
    const storedStylistName2 = localStorage.getItem('selectedStylistName2');

    const storedDate = localStorage.getItem('selectedDate');
    const storedDate2 = localStorage.getItem('selectedDate2');

    const storedSlotIds = localStorage.getItem('selectedSlotIds');
    const storedSlotIds2 = localStorage.getItem('selectedSlotIds2');


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
    if (storedServiceId2) {
      setServiceId2(Number(storedServiceId2));
      setServiceName2(storedServiceName2);
      setServiceDuration2(Number(storedServiceDuration2));

    }
    if (storedStylistId) {
      setStylistId(Number(storedStylistId));
      setStylistName(storedStylistName);
    }
    if (storedStylistId2) {
      setStylistId2(Number(storedStylistId2));
      setStylistName2(storedStylistName2);
    }
    if (storedDate) {
      setDate(storedDate);
    }
    if (storedDate2) {
      setDate2(storedDate2);
    }
    if (storedSlotIds) {
      const parsedSlotIds = JSON.parse(storedSlotIds);
      setSlotId(Array.isArray(parsedSlotIds) ? parsedSlotIds.map(Number) : []);
    }
    if (storedSlotIds2) {
      const parsedSlotIds2 = JSON.parse(storedSlotIds2);
      setSlotId2(Array.isArray(parsedSlotIds2) ? parsedSlotIds2.map(Number) : []);
    }
  }, []);

  console.log(`salon ${salonId}`);
  console.log(`service ${serviceId2}`);
  console.log(`stylist ${stylistId2}`);
  console.log(`date ${date2}`);
  console.log(`slot ${slotIds2}`);

  const formatDateToISO = (dateString: string) => {
    const [month, day, year] = dateString.split('-');
    return `${year}-${month}-${day}T12:00:00Z`;
  };
  
  const appointment2: AppointmentProps = {
    salonId: salonId ?? 0,
    dateToGo: date2 ? new Date(formatDateToISO(date2)).toISOString() : '',
    items: [
      {
        serviceId: serviceId2 ?? 0,
        stylistId: stylistId2 ?? 0,
        slots: slotIds2.map(id => ({ id }))
      }
    ]
  };
  
  const appointment: AppointmentProps = {
    salonId: salonId ?? 0,
    dateToGo: date ? new Date(formatDateToISO(date)).toISOString() : '',
    items: [
      {
        serviceId: serviceId ?? 0,
        stylistId: stylistId ?? 0,
        slots: slotIds.map(id => ({ id }))
      }
    ]
  };
  
  

  const handleDoneClick = () => {
    setOpenConfirmDialog(true);
    console.log(appointment);
    console.log(appointment2)
  };

  // Đổi tên tham số appointment thành `apt` trong hàm isAppointmentValid
const isAppointmentValid = (apt: AppointmentProps) => (
  apt.salonId !== undefined &&
  apt.dateToGo !== '' &&
  apt.items.length > 0 &&
  apt.items.every(item => item.serviceId !== 0 && item.stylistId !== 0 && item.slots.length > 0)
);

const handleConfirm = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      let response;  
      
      if (appointment && isAppointmentValid(appointment)) {
        response = await appointmentApi.createAppointment(appointment);
      } else if (appointment2 && isAppointmentValid(appointment2)) {
        response = await appointmentApi.createAppointment(appointment2);
      } else {
        showAlert('Appointment is not valid');
        return;
      }

      const payment: PaymentItemProps = response?.data;

      if (payment && payment.checkoutUrl) {
        window.location.href = payment.checkoutUrl;
      }
    } else {
      navigate('/sign-in');
    }

    setOpenConfirmDialog(false);
  } catch (error) {
    console.error('Failed to create appointment', error);
  }
};

  
  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

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
    localStorage.removeItem('selectedServiceId2');
    localStorage.removeItem('selectedServiceName2');
    localStorage.removeItem('selectedStylistId2');
    localStorage.removeItem('selectedStylistName2');
    localStorage.removeItem('selectedDate2');
    localStorage.removeItem('selectedSlotIds2');
    localStorage.removeItem('selectedStylistDuration2');
    setServiceId2(null);
    setServiceName2(null);
    setStylistId2(null);
    setStylistName2(null);
    setDate2(null);
    setSlotId2([]);
    setServiceDuration2(null)

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
    localStorage.removeItem('selectedServiceId2');
    localStorage.removeItem('selectedServiceName2');
    localStorage.removeItem('selectedStylistId2');
    localStorage.removeItem('selectedStylistName2');
    localStorage.removeItem('selectedDate2');
    localStorage.removeItem('selectedSlotIds2');
    localStorage.removeItem('selectedStylistDuration2');
    setServiceId2(null);
    setServiceName2(null);
    setStylistId2(null);
    setStylistName2(null);
    setDate2(null);
    setSlotId2([]);
    setServiceDuration2(null)
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

            {viewChoice === 'stylist' && salonId !== null && (
              <AppointmentStylistServiceSlot
                selectedServiceName2={serviceName2}
                selectedStylistName2={stylistName2}
                onClear2={clearServiceAndStylist}
                viewdone2={handleViewDone}
              />

            )}
            {/* 
            {serviceName !== null && stylistName !== null && (
              <Link marginLeft={1}>
                + Choose other service
              </Link>
            )} */}

            {viewDone && (
              <Button
                onClick={handleDoneClick}
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

      <Dialog open={openConfirmDialog} onClose={handleCancel}>
        <DialogTitle>Create Appointment Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make this appointment with these selection and continue to checkout
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <AlertDialog open={alertOpen} message={alertMessage} onClose={handleAlertClose} />

    </HomeContent>
  );
}


