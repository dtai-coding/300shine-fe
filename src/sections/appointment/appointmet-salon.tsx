import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Link, Dialog, Button, Typography, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export function AppointmentSalon({ selectedSalonAddress }: { selectedSalonAddress: string | null }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [hasSelectedService, setHasSelectedService] = useState(false);

  // Check if the user has already selected a service
  useEffect(() => {
    const storedServiceId = localStorage.getItem('selectedServiceId');
    if (storedServiceId) {
      setHasSelectedService(true); // Set flag to true if service is selected
    }
  }, []);

  const handleRedirect = () => {
    if (selectedSalonAddress && hasSelectedService) {
      setOpenDialog(true); // Show dialog only if a salon is selected and service is also selected
    } else {
      navigate('/select-salon'); // If no service is selected, go directly to salon selection
    }
  };

  const handleConfirmChangeSalon = () => {
    // Clear the selected service and stylist in localStorage
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');

    // Navigate to salon selection page
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
