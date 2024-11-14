
import type { SalonCreateProps, SalonUpdateProps } from 'src/model/request/salon';

import React, { useState, useEffect } from 'react';

import {
  Box,
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
  onSave: (salon: SalonCreateProps) => void;
  salon?: SalonCreateProps | null;
  isEditMode?: boolean;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function SalonDialog({
  open,
  onClose,
  onSave,
  salon,
  isEditMode = false,
  imageFile,
  setImageFile,
}: SalonDialogProps) {
  const [newSalon, setNewSalon] = useState<SalonCreateProps | SalonUpdateProps>({
    id: 0,
    imageUrl: '',
    address: '',
    phone: 0,
    district: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageFile(file);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isEditMode && salon) setNewSalon(salon);
  }, [isEditMode, salon]);

  const resetForm = () => {
    setNewSalon({
      imageUrl: '',
      address: '',
      phone: 0,
      district: '',
    });
  };

  const handleOnCancel = () => {
    onClose();
    setImageFile(null);
    setImagePreview(null);
    resetForm();
  };

  const handleOnSave = () => {
    onSave(newSalon);
    setImageFile(null);
    setImagePreview(null);

    console.log('Salon saved successfully!');

    resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSalon((prevSalon: SalonCreateProps | SalonUpdateProps) => ({
      ...prevSalon,
      [name]: name === 'phone' || name === 'id' ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} maxWidth="sm" fullWidth>
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
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{ width: 100, height: 100 }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnCancel}>Cancel</Button>
        <Button onClick={handleOnSave} variant="contained">
          {isEditMode ? 'Save Changes' : 'Add Salon'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
