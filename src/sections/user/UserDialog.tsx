import type { UserCreateProps, UserUpdateProps } from 'src/model/request/User';

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

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserCreateProps | UserUpdateProps) => void;
  user?: UserCreateProps | UserUpdateProps | null;
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
  const ROLE_MAP: { [key: string]: string } = {
    Admin: '1',
    Manager: '2',
    Customer: '3',
    Stylist: '4',
  };
  const isUserUpdateProps = (u: UserCreateProps | UserUpdateProps): u is UserUpdateProps =>
    'role' in u;

  const [newUser, setNewUser] = useState<UserCreateProps | UserUpdateProps>({
    phone: '',
    password: (user as UserCreateProps).password ?? '',
    fullName: '',
    dateOfBirth: '',
    gender: true,
    address: '',
    role: (user as UserUpdateProps).role ?? '',
    isStylist: false,
    isVerified: false,
    status: '',
    salonId: 0,
    imageUrl: '',
    commission: 0,
    salary: 0,
    salaryPerDay: 0,
  });
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
    if (isEditMode && user) {
      // Update the form only when editing an existing user, not when creating a new one
      setNewUser({
        phone: user.phone ?? '',
        fullName: user.fullName ?? '',
        dateOfBirth: user.dateOfBirth ?? '',
        gender: user.gender ?? true,
        address: user.address ?? '',
        isVerified: user.isVerified ?? false,
        status: user.status ?? '',
        salonId: user.salonId ?? 0,
        imageUrl: user.imageUrl ?? '',
        commission: user.commission ?? 0,
        salary: user.salary ?? 0,
        salaryPerDay: user.salaryPerDay ?? 0,
        role: (user as UserUpdateProps).role ?? '',
      });
    }
  }, [isEditMode, user]);

  const resetForm = () => {
    setNewUser({
      phone: '',
      fullName: '',
      dateOfBirth: '',
      gender: true,
      address: '',
      role: '',
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
    if (newUser.fullName && newUser.phone) {
      onSave(newUser);
      setImageFile(null);
      setImagePreview(null);

      console.log('User saved successfully!');

      resetForm();
    } else {
      console.log('Please fill in all required fields.');
    }
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
            value={(newUser as UserCreateProps).password ?? ''}
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
            value={newUser.dateOfBirth}
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
          <Button variant="outlined" component="label" sx={{ width: 50, height: 50 }}>
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

          {isEditMode && (
            <Box display="flex" gap={2} sx={{ width: '40%', marginLeft: 'auto' }}>
              <TextField
                fullWidth
                select
                label="Role"
                name="role"
                value={isUserUpdateProps(newUser) && newUser.role ? ROLE_MAP[newUser.role] : ''}
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
