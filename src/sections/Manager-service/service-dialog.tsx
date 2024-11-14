import FileUploadButton from 'src/components/FileUploadButton';

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
import { ServiceActionProps } from 'src/model/request/service';

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (service: ServiceActionProps) => void;
  service?: ServiceActionProps | null;
  isEditMode?: boolean;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function ServiceDialog({
  open,
  onClose,
  onSave,
  service,
  isEditMode = false,
  imageFile,
  setImageFile,
}: ServiceDialogProps) {
  const [newService, setNewService] = useState<ServiceActionProps>({
    id: 0,
    imageUrl: '',
    price: 0,
    name: '',
    description: '',
    salonId: 0,
    isDeleted: false,
    serviceStyles: [{ styleId: null }],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && service) {
      setNewService({ ...service });
      setImagePreview(service.imageUrl || null);
    }
  }, [isEditMode, service]);

  const resetForm = () => {
    setNewService({
      imageUrl: '',
      price: 0,
      name: '',
      description: '',
      salonId: 0,
      isDeleted: false,
      serviceStyles: [{ styleId: null }],
    });
  };
  const handleOnCancel = () => {
    onClose();
    setImageFile(null);
    setImagePreview(null);
    resetForm();
  };

  const handleOnSave = () => {
    onSave(newService);
    setImageFile(null);
    setImagePreview(null);

    // console.log('Service saved successfully!');

    resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewService((prevService: ServiceActionProps) => ({
      ...prevService,
      [name]: name === 'price' || name === 'id' || name === 'salonId' ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Salon' : 'Add New Salon'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Service Name"
          name="name"
          value={newService.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={newService.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newService.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Salon ID"
          name="salonId"
          type="number"
          value={newService.salonId}
          onChange={handleChange}
          margin="normal"
        />
        <FileUploadButton onFileSelect={(file) => setImageFile(file)} initialImage={imagePreview} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnCancel}>Cancel</Button>
        <Button onClick={handleOnSave} variant="contained">
          {isEditMode ? 'Save Changes' : 'Add Service'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
