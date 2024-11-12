import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { registerAPI } from 'src/api/apis';

import { Iconify } from 'src/components/iconify';
import FileUploader from 'src/components/firebase/FileUploader';



// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(true);
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = useCallback(async () => {
    if (!imageUrl) {
      setError('Please upload a profile picture.');
      return;
    }
    setLoading(true);
    setError('');

    const data = {
      phone,
      password,
      fullName,
      dateOfBirth,
      gender,
      address,
      imageUrl, // Include imageUrl in registration data
    };

    try {
      const response = await registerAPI(data);
      console.log('Registration successful:', response);
      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please check your input.');
    } finally {
      setLoading(false);
    }
  }, [phone, password, fullName, dateOfBirth, gender, address, imageUrl, router]);

  const handleUploadSuccess = (url: string) => {
    setImageUrl(url);
  };

  const handleSignInClick = () => {
    router.push('/sign-in');
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="fullName"
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="gender"
        label="Gender"
        select
        SelectProps={{
          native: true,
        }}
        value={gender ? 'true' : 'false'}
        onChange={(e) => setGender(e.target.value === 'true')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      >
        <option value="true">Male</option>
        <option value="false">Female</option>
      </TextField>
      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <FileUploader onUploadSuccess={handleUploadSuccess} />

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignUp}
        loading={loading}
      >
        Sign Up
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleSignInClick}>
            Sign in
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
