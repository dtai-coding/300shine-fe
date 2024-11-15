import type { UserActionProps } from 'src/model/request/User';

import React, { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  Checkbox,
  TextField,
  DialogTitle,
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
}
export function UserDialog({
  open,
  onClose,
  onSave,
  user,
  isEditMode = false,
  imageFile,
  setImageFile,
}: UserDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Initial user state: defaults to create or update props based on edit mode

  const defaultUser: UserActionProps = {
    phone: null,
    fullName: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    isVerified: false,
    status: '',
    salonId: null,
    imageUrl: null,
    commission: 0,
    salary: 0,
    salaryPerDay: 0,
    password: '', // Optional properties can be set to null or default values as needed
    roleId: 0,
    isStylist: false,
  };

  // Set initial state with new `UserActionProps`
  const [newUser, setNewUser] = useState<UserActionProps>(defaultUser);

  useEffect(() => {
    if (isEditMode && user) {
      setNewUser({
        ...user,
      });
      setImagePreview(user.imageUrl || null);
    }
  }, [isEditMode, user]);

  const resetForm = () => {
    setNewUser({
      phone: '',
      fullName: '',
      dateOfBirth: '',
      gender: true,
      address: '',
      roleId: 0,
      isStylist: false,
      isVerified: false,
      status: '',
      salonId: 0,
      imageUrl: '',
      commission: 0,
      salary: 0,
      salaryPerDay: 0,
    });
  };
  const handleOnCancel = () => {
    onClose();
    setImageFile(null);
    setImagePreview(null);
    resetForm();
  };

  const handleOnSave = () => {
    const userToSave: UserActionProps = {
      ...newUser,
    };
    onSave(userToSave);
    setImageFile(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleOnCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent dividers>
        {/* Common fields */}
        <TextField
          label="Phone"
          name="phone"
          value={newUser.phone}
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
          value={newUser.fullName}
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
          value={newUser.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Status"
          name="status"
          value={newUser.status}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Salon ID"
          name="salonId"
          type="number"
          value={newUser.salonId}
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
