import type { UserCreateProps, UserUpdateProps } from 'src/model/request/User';

import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Box,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserCreateProps | UserUpdateProps) => void;
  user?: UserCreateProps | UserUpdateProps | null;
  isEditMode?: boolean;
}

export function UserDialog({ open, onClose, onSave, user, isEditMode = false }: UserDialogProps) {
  // Initial user state: defaults to create or update props based on edit mode
  const ROLE_MAP: { [key: string]: string } = {
    Admin: '1',
    Manager: '2',
    'Customer\n': '3',
    Stylist: '4',
  };

  const isUserUpdateProps = (u: UserCreateProps | UserUpdateProps): u is UserUpdateProps =>
    'role' in u;

  const [newUser, setNewUser] = useState<UserCreateProps | UserUpdateProps>(
    isEditMode
      ? {
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
        }
      : {
          phone: '',
          password: '',
          fullName: '',
          dateOfBirth: '',
          gender: true,
          address: '',
          isVerified: false,
          status: '',
          salonId: 0,
          imageUrl: '',
          commission: 0,
          salary: 0,
          salaryPerDay: 0,
        }
  );

  useEffect(() => {
    if (user) setNewUser(user);
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'role' ? value : type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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

        {isEditMode && (
          <Box display="flex" gap={2} sx={{ width: '100%' }}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={(newUser as UserUpdateProps).isStylist ?? false}
                  onChange={handleChange}
                  name="isStylist"
                  color="primary"
                  sx={{ flexGrow: 1 }}
                />
              }
              label="Is Stylist"
            />
          </Box>
        )}
        <TextField
          fullWidth
          label="Image URL"
          name="imageUrl"
          value={newUser.imageUrl}
          onChange={handleChange}
          margin="normal"
        />
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(newUser)} variant="contained">
          {isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
