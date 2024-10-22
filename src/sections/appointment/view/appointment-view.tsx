
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Iconify } from "src/components/iconify";
import Card from "@mui/material/Card";

import { HomeContent } from 'src/layouts/home';
import { AppointmentSalon } from "../appointmet-salon";
import { AppointmentServiceStylistSlot } from "../appointment-service-stylist-slot";



export function AppointmentView() {
  const [salonId, setSalonId] = useState<number | null>(null);
  const [salonAddress, setSalonAddress] = useState<string | null>(null); 

  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const storedSalonAddress = localStorage.getItem('selectedSalonAddress');
    if (storedSalonId) {
      setSalonId(Number(storedSalonId)); 
      setSalonAddress(storedSalonAddress); 
      console.log('Successfully Store:', storedSalonId );
      console.log('Successfully Store:', storedSalonAddress );
    }
  }, []);

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
            {salonId !== 0 && <AppointmentServiceStylistSlot />}
          </Box>
        </Card>
      </Box>

    </HomeContent>
  );
}