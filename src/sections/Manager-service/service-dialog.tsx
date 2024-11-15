import type {
  SelectChangeEvent} from '@mui/material';
import type { ServiceActionProps } from 'src/model/request/service';

import React, { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent
} from '@mui/material';

import FileUploadButton from 'src/components/FileUploadButton';

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (service: ServiceActionProps) => void;
  service?: ServiceActionProps | null;
  isEditMode?: boolean;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  availableStyles: { styleId: number; styleName: string }[];
  availableSalons: { salonId: number; salonName: string }[];
}

export function ServiceDialog({
  open,
  onClose,
  onSave,
  service,
  isEditMode = false,
  imageFile,
  setImageFile,
  availableStyles,
  availableSalons,
}: ServiceDialogProps) {
  const [newService, setNewService] = useState<ServiceActionProps>({
    id: 0,
    imageUrl: '',
    price: 0,
    name: '',
    description: '',
    salonId: 0,
    duration: 0,
    isDeleted: false,
    serviceStyles: [],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

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
      duration: 0,
      isDeleted: false,
      serviceStyles: [],
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
    resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewService((prevService: ServiceActionProps) => ({
      ...prevService,
      [name]: name === 'price' || name === 'id' || name === 'salonId' ? Number(value) : value,
    }));
  };

  const handleSalonChange = (event: SelectChangeEvent<number | null>) => {
    setNewService((prevService) => ({
      ...prevService,
      salonId: event.target.value as number,
    }));
  };

  const handleAddStyle = () => {
    if (
      selectedStyle &&
      !newService.serviceStyles.some((style) => style.styleId === selectedStyle)
    ) {
      setNewService((prevService) => ({
        ...prevService,
        serviceStyles: [...prevService.serviceStyles, { styleId: selectedStyle }],
      }));
    }
  };

  const handleRemoveStyle = (styleId: number | null | undefined) => {
    if (styleId != null) {
      setNewService((prevService) => ({
        ...prevService,
        serviceStyles: prevService.serviceStyles.filter((style) => style.styleId !== styleId),
      }));
    }
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Service' : 'Add New Service'}</DialogTitle>
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
          label="Duration"
          name="duration"
          type="number"
          value={newService.duration}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="salon-select-label">Select Salon</InputLabel>
          <Select
            labelId="salon-select-label"
            value={newService.salonId}
            onChange={handleSalonChange}
            label="Select Salon"
          >
            {availableSalons.map((salon) => (
              <MenuItem key={salon.salonId} value={salon.salonId}>
                {salon.salonName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box gap={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <FileUploadButton
            onFileSelect={(file) => setImageFile(file)}
            initialImage={imagePreview}
          />
          <FormControl margin="normal" sx={{ marginLeft: 'auto', width: '37%' }}>
            <InputLabel id="style-select-label">Select Style</InputLabel>
            <Select
              labelId="style-select-label"
              value={selectedStyle || ''}
              onChange={(e) => setSelectedStyle(Number(e.target.value))}
              label="Select Style"
            >
              {availableStyles.map((style) => (
                <MenuItem key={style.styleId} value={style.styleId}>
                  {style.styleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleAddStyle} variant="contained">
            Add Style
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
          {newService.serviceStyles.map((style) => {
            const styleInfo = availableStyles.find((s) => s.styleId === style.styleId);
            return (
              styleInfo && (
                <Box
                  key={style.styleId}
                  sx={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    margin: '4px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '16px',
                  }}
                >
                  <span>{styleInfo.styleName}</span>
                  <Button
                    onClick={() => handleRemoveStyle(style.styleId)}
                    sx={{ marginLeft: 1, padding: 0 }}
                    size="small"
                  >
                    X
                  </Button>
                </Box>
              )
            );
          })}
        </Box>
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
