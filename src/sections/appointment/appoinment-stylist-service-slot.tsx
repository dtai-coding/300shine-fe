import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function AppointmentStylistServiceSlot() {
  return (
    <Box
      sx={{
        padding: 3,          
        boxShadow: 3,       
        borderRadius: 2,     
        backgroundColor: '#fff', 
        maxWidth: 700,      
      }}
    >
      <Typography variant="h5" mb={2}>
        Select Stylist, Service, and Slot
      </Typography>
      <Typography variant="h6" mb={2}>
        Choose Stylist
      </Typography>
    </Box>
  );
}