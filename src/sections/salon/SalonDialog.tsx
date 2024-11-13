import type { SalonViewProps } from 'src/model/response/salon';

import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

interface SalonDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (salon: SalonViewProps) => void;
  salon?: SalonViewProps | null;
  isEditMode?: boolean;
}

export function SalonDialog({
  open,
  onClose,
  onSave,
  salon,
  isEditMode = false,
}: SalonDialogProps) {
  const [newSalon, setNewSalon] = useState<SalonViewProps>({
    id: 0,
    imageUrl: '',
    address: '',
    phone: 0,
    district: '',
  });

  useEffect(() => {
    if (salon) setNewSalon(salon);
  }, [salon]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSalon((prevSalon) => ({
      ...prevSalon,
      [name]: name === 'phone' || name === 'id' ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Salon' : 'Add New Salon'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Phone"
          name="phone"
          type="number"
          value={newSalon.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          fullWidth
          label="Image URL"
          name="imageUrl"
          value={newSalon.imageUrl}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={newSalon.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="District"
          name="district"
          value={newSalon.district}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(newSalon)} variant="contained">
          {isEditMode ? 'Save Changes' : 'Add Salon'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
