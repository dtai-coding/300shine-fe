import type { UserActionProps } from 'src/model/request/User';
import React, { useState, useEffect } from 'react';
import {
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
import { useAuthStore } from 'src/stores/auth/auth.store';
import FileUploadButton from 'src/components/FileUploadButton';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: UserActionProps) => void;
  user?: UserActionProps | null;
  isEditMode?: boolean;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  availableStyles: { styleId: number; styleName: string }[];
  availableSalons: { salonId: number; salonName: string }[];
}

export function UserDialog({
  open,
  onClose,
  onSave,
  user,
  isEditMode = false,
  imageFile,
  setImageFile,
  availableStyles,
  availableSalons,
}: UserDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const { auth } = useAuthStore();

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
    password: '',
    roleId: 0,
    isStylist: false,
    styleId: [],
  };

  const [newUser, setNewUser] = useState<UserActionProps>(defaultUser);

  useEffect(() => {
    if (isEditMode && user) {
      setNewUser({ ...user });
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

  // const handleAddStyle = () => {
  //   if (selectedStyle && !newUser.styleId.includes(selectedStyle)) {
  //     setNewUser((prevUser) => ({
  //       ...prevUser,
  //       styleId: [...prevUser.styleId, selectedStyle],
  //     }));
  //   }
  // };

  // const handleRemoveStyle = (styleId: number) => {
  //   setNewUser((prevUser) => ({
  //     ...prevUser,
  //     styleId: prevUser.styleId.filter((id) => id !== styleId),
  //   }));
  // };

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

        {/* <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
          <FileUploadButton
            onFileSelect={(file) => setImageFile(file)}
            initialImage={imagePreview}
          />
          <FormControl margin="normal" sx={{ width: '37%' }}>
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

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
          {newUser.styleId.map((id) => {
            const styleInfo = availableStyles.find((style) => style.styleId === id);
            return (
              styleInfo && (
                <Box
                  key={id}
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
                    onClick={() => handleRemoveStyle(id)}
                    sx={{ ml: 1, padding: 0 }}
                    size="small"
                  >
                    X
                  </Button>
                </Box>
              )
            );
          })}
        </Box> */}
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
