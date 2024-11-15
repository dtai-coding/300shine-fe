import type { SalonActionProps } from 'src/model/request/salon';

import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import FileUploadButton from 'src/components/FileUploadButton';

interface SalonDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (salon: SalonActionProps) => void;
  salon?: SalonActionProps | null;
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
  const [newSalon, setNewSalon] = useState<SalonActionProps>({
    id: 0,
    imageUrl: '',
    address: '',
    phone: 0,
    district: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && salon) {
      setNewSalon({ ...salon });
      setImagePreview(salon.imageUrl || null);
    }
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
    setNewSalon((prevSalon: SalonActionProps) => ({
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
        <FileUploadButton onFileSelect={(file) => setImageFile(file)} initialImage={imagePreview} />
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
