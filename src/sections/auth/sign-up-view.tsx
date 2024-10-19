import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { registerAPI } from 'src/api/apis'; // Import register API

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(''); // State for phone
  const [password, setPassword] = useState(''); // State for password
  const [fullName, setFullName] = useState(''); // State for full name
  const [dateOfBirth, setDateOfBirth] = useState(''); // State for date of birth
  const [gender, setGender] = useState(true); // State for gender (true = male, false = female)
  const [address, setAddress] = useState(''); // State for address
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(''); // State for errors

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setError(''); // Reset error before making a new request

    const data = {
      phone,
      password,
      fullName,
      dateOfBirth,
      gender,
      address,
    };

    try {
      const response = await registerAPI(data); // Call the register API
      console.log('Registration successful:', response);
      // Handle successful registration, redirect to login or home
      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please check your input.');
    } finally {
      setLoading(false);
    }
  }, [phone, password, fullName, dateOfBirth, gender, address, router]);

  const handleSignInClick = () => {
    router.push('/sign-in'); // This pushes the user to the /sign-up page
  };


  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="fullName"
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)} // Update full name state
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)} // Update date of birth state
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="phone"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Update phone state
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)} // Update address state
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
        onChange={(e) => setGender(e.target.value === 'true')} // Update gender state
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
        onChange={(e) => setPassword(e.target.value)} // Update password state
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

      {/* <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}>
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
    </>
  );
}
