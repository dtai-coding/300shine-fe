
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Iconify } from "src/components/iconify";
import Card from "@mui/material/Card";

import { HomeContent } from 'src/layouts/home';
import { AppointmentSalon } from "../appointmet-salon";
import { AppointmentServiceStylistSlot } from "../appointment-service-stylist-slot";
import { AppointmentStylistServiceSlot } from "../appoinment-stylist-service-slot";



export function AppointmentView() {
  const [salonId, setSalonId] = useState<number | null>(null);
  const [salonAddress, setSalonAddress] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [viewChoice, setViewChoice] = useState<string | null>(null);

  // Khôi phục dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const storedSalonAddress = localStorage.getItem('selectedSalonAddress');
    const storedserviceId = localStorage.getItem('selectedServiceId');
    const storedserviceName = localStorage.getItem('selectedServiceName');
    const storedViewChoice = localStorage.getItem('viewChoice');

    if (storedSalonId) {
      setSalonId(Number(storedSalonId));
      setSalonAddress(storedSalonAddress);
    }

    if (storedViewChoice) {
      setViewChoice(storedViewChoice);
    }
    if(storedserviceId){
      setServiceId(Number(storedserviceId));
      setServiceName(storedserviceName);
    }
  }, []);

  // Lưu lựa chọn của người dùng vào localStorage
  const handleViewChoice = (choice: string) => {
    setViewChoice(choice);
    localStorage.setItem('viewChoice', choice);
  };

  return (
    <HomeContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h2" flexGrow={1}>
          Make Appointment
        </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
      }}>
        <Card
          sx={{
            width: 700,
            padding: 2,
            boxShadow: 3
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <AppointmentSalon selectedSalonAddress={salonAddress} />
            
            {salonId !== null && (viewChoice === null || viewChoice === 'back') && (
              <>
                <Button onClick={() => handleViewChoice('service')} sx={{
                  fontSize: '18px',
                  '&:hover': {
                    color: '#0755bb',
                  }
                }}>
                  Choose Service
                </Button>
                <Button onClick={() => handleViewChoice('stylist')} sx={{
                  fontSize: '18px',
                  '&:hover': {
                    color: '#0755bb',
                  }
                }}>
                  Choose Stylist
                </Button>
              </>
            )}

            {viewChoice === 'service' && salonId !== null && <AppointmentServiceStylistSlot selectedServiceName={serviceName}/>}

            {viewChoice === 'stylist' && salonId !== null && <AppointmentStylistServiceSlot />}
            {salonId !== null && serviceId === null  &&(viewChoice === 'service' || viewChoice === 'stylist') && (
              <Button onClick={() => handleViewChoice('back')}
                sx={{
                  fontSize: '18px',
                  color: 'lightgray',            
                  '&:hover': {
                    backgroundColor: 'lightgray', 
                    color: 'black',
                  }
                }}>
                Back 
              </Button>
            )}
          </Box>
        </Card>
      </Box>
    </HomeContent>
  );
}