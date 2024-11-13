import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Link, Card, Dialog, Button, Typography, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export function AppointmentSalon({ selectedSalonAddress }: { selectedSalonAddress: string | null }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [hasSelectedService, setHasSelectedService] = useState(false);
  const [hasSelectedStylist2, setHasSelectedStylist2] = useState(false);


  useEffect(() => {
    const storedServiceId = localStorage.getItem('selectedServiceId');
    const storedStylistId2 = localStorage.getItem('selectedServiceId2');

    if (storedServiceId) {
      setHasSelectedService(true); 
    }
    if (storedStylistId2) {
      setHasSelectedStylist2(true); 
    }
  }, []);

  const handleRedirect = () => {
    if ((selectedSalonAddress && hasSelectedService)||(selectedSalonAddress && hasSelectedStylist2)) {
      setOpenDialog(true); 
    } else {
      navigate('/select-salon'); 
    }
  };

  const handleConfirmChangeSalon = () => {
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedSlotIds');
    localStorage.removeItem('selectedStylistDuration');
    localStorage.removeItem('selectedServiceId2');
    localStorage.removeItem('selectedServiceName2');
    localStorage.removeItem('selectedStylistId2');
    localStorage.removeItem('selectedStylistName2');
    localStorage.removeItem('selectedDate2');
    localStorage.removeItem('selectedSlotIds2');
    localStorage.removeItem('selectedStylistDuration2');

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
        <Card
        onClick={handleRedirect}        
        sx={{
          cursor:'pointer',
          height: '30px',
          margin: '18px',
          backgroundColor:'#b3e5fc' ,
          color:  'black',
          transition: '0.3s',
          '&:hover': {
            backgroundColor:  'palegoldenrod ' ,
          },
        }}
        >
        <Link
          color="inherit"
          marginLeft='20px'
          underline="hover"
          variant="subtitle1"
          noWrap
          sx={{ cursor: 'pointer' }}
        >
          {selectedSalonAddress}
        </Link>
        </Card>
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Change Salon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Changing the salon will reset your selected services and stylist. Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmChangeSalon} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
