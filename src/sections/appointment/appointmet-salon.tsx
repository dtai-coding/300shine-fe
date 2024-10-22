import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useEffect } from 'react';

export function AppointmentSalon({ selectedSalonAddress }: { selectedSalonAddress: string | null }) {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/select-salon');
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
        Select Salon
      </Typography>
      
      {selectedSalonAddress ? (
        <Link
        color="inherit"
        underline="hover"
        variant="subtitle1"
        noWrap
        sx={{ cursor: 'pointer' }}
        onClick={handleRedirect}
      >
          {selectedSalonAddress}
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
    </Box>
  );
}
