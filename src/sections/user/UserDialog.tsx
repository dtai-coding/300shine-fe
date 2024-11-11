import type { UserCreateProps } from 'src/model/response/User';

import React, { useState, useEffect } from 'react';

import {
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
  onSave: (user: UserCreateProps) => void;
  user?: UserCreateProps | null;
  isEditMode?: boolean;
}

export function UserDialog({ open, onClose, onSave, user, isEditMode = false }: UserDialogProps) {
  const [newUser, setNewUser] = useState<UserCreateProps>({
    phone: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: true,
    address: '',
    isVerified: false,
    status: '',
    salonId: 1,
    commission: 0,
    salary: 0,
    salaryPerDay: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (user) setNewUser(user);
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]:
        name === 'salonId' || name === 'commission' || name === 'salary' || name === 'salaryPerDay'
          ? Number(value)
          : value,
    }));
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Phone"
          name="phone"
          value={newUser.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          name="fullName"
          value={newUser.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={newUser.dateOfBirth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
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
        >
          <option value="true">Male</option>
          <option value="false">Female</option>
        </TextField>
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
