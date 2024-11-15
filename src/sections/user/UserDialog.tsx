import type { UserActionProps } from 'src/model/request/User';
import React, { useState, useEffect } from 'react';
import {
  Chip,
  Box,
  Dialog,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';
import FileUploadButton from 'src/components/FileUploadButton';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserActionProps) => void;
  user?: UserActionProps | null;
  isEditMode?: boolean;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  availableSalons: { salonId: number; salonName: string }[];
  availableStyles: { styleId: number; styleName: string }[];
}

export function UserDialog({
  open,
  onClose,
  onSave,
  user,
  isEditMode = false,
  imageFile,
  setImageFile,
  availableSalons,
  availableStyles,
}: UserDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

  const defaultUser: UserActionProps = {
    phone: '',
    fullName: '',
    dateOfBirth: null,
    gender: true,
    address: '',
    isVerified: false,
    status: '',
    salonId: null,
    imageUrl: null,
    commission: 0,
    salary: 0,
    salaryPerDay: 0,
    password: '',
    roleId: 0,
    isStylist: false,
    styleId: [], // Initialize as an empty array
  };

  const [newUser, setNewUser] = useState<UserActionProps>(defaultUser);

  useEffect(() => {
    if (isEditMode && user) {
      setNewUser({ ...user, styleId: user.styleId ?? [] }); // Ensure `styleId` is an array
      setImagePreview(user.imageUrl || null);
    }
  }, [isEditMode, user]);

  const resetForm = () => {
    setNewUser(defaultUser);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleOnCancel = () => {
    onClose();
    resetForm();
  };

  const handleOnSave = () => {
    onSave(newUser);
    resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleAddStyle = () => {
    if (selectedStyle && !newUser.styleId?.includes(selectedStyle)) {
      setNewUser((prevUser) => ({
        ...prevUser,
        styleId: [...(prevUser.styleId ?? []), selectedStyle], // Safely add style
      }));
    }
  };

  // Remove the selected style ID from the styleId list
  const handleRemoveStyle = (styleId: number) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      styleId: (prevUser.styleId ?? []).filter((id) => id !== styleId), // Safely remove style
    }));
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Phone"
          name="phone"
          value={newUser.phone || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {!isEditMode && (
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password ?? ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        <TextField
          label="Full Name"
          name="fullName"
          value={newUser.fullName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box display="flex" gap={2} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={
              newUser.dateOfBirth ? new Date(newUser.dateOfBirth).toISOString().split('T')[0] : ''
            }
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ flexGrow: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.isVerified ?? false}
                onChange={handleChange}
                name="isVerified"
                color="primary"
              />
            }
            label="Verified"
            labelPlacement="top"
            sx={{ flexGrow: 1, mb: 1 }}
          />
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={String(newUser.gender)}
            onChange={handleChange}
            margin="normal"
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
            sx={{ flexGrow: 1 }}
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </TextField>
        </Box>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={newUser.address || ''}
          onChange={handleChange}
          margin="normal"
        />
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
          <FileUploadButton
            onFileSelect={(file) => setImageFile(file)}
            initialImage={imagePreview}
          />
          {isEditMode && (
            <Box display="flex" gap={2} sx={{ width: '40%', marginLeft: 'auto' }}>
              <TextField
                fullWidth
                select
                label="Role"
                name="roleId"
                value={newUser.roleId ?? ''}
                onChange={handleChange}
                margin="normal"
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
                sx={{ flexGrow: 1 }}
              >
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Customer</option>
                <option value="4">Stylist</option>
              </TextField>
            </Box>
          )}
        </Box>

        <TextField
          fullWidth
          select
          label="Salon"
          name="salonId"
          value={newUser.salonId ?? ''}
          onChange={handleChange}
          margin="normal"
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
        >
          <option value="">Select a salon</option>
          {availableSalons.map((salon) => (
            <option key={salon.salonId} value={salon.salonId}>
              {salon.salonName}
            </option>
          ))}
        </TextField>

        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="style-select-label">Select Style</InputLabel>
            <Select
              labelId="style-select-label"
              value={selectedStyle ?? ''}
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
          <Button onClick={handleAddStyle} variant="contained" sx={{ mt: 2 }}>
            Add Style
          </Button>
        </Box>

        {/* Display Selected Styles */}
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(newUser.styleId ?? []).map((id) => (
            <Chip
              key={id}
              label={`Style ${id}`}
              onDelete={() => handleRemoveStyle(id)}
              color="primary"
            />
          ))}
        </Box>

        <TextField
          fullWidth
          label="Commission"
          name="commission"
          type="number"
          value={newUser.commission}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          type="number"
          value={newUser.salary}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Salary Per Day"
          name="salaryPerDay"
          type="number"
          value={newUser.salaryPerDay}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnCancel}>Cancel</Button>
        <Button onClick={handleOnSave} variant="contained">
          {isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
