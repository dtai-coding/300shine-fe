import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';


export function AppointmentServiceStylistSlot({ selectedServiceName }: { selectedServiceName: string | null }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/select-service');
  };

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
        1. Select Service
      </Typography>
      <Typography variant="h6" mb={2}>
        {selectedServiceName ? (
          <Link
            color="inherit"
            underline="hover"
            variant="subtitle1"
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={handleRedirect}
          >
            {selectedServiceName}
          </Link>
        ) : (
          <Link
            color="inherit"
            underline="hover"
            variant="subtitle1"
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={handleRedirect}
          >
            Choose Salon
          </Link>
        )}
      </Typography>
      {selectedServiceName !== null && (
      <Typography variant="h5" mb={2}>
        1. Select Styilst
      </Typography>
      )}
    </Box>
  );
}