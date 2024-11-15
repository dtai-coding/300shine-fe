import type { SalonItemProps } from 'src/model/response/salon';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SalonItem({ salon }: { salon: SalonItemProps }) {
  const navigate = useNavigate();

  const handleSelectSalon = () => {
    localStorage.setItem('selectedSalonId', salon.id.toString());
    localStorage.setItem('selectedSalonAddress', salon.address.toString());

    // Trường hợp nếu customer đã chọn salon và service rồi, nhưng muốn đổi salon
    // phải xóa hết các service và stylist đã chọn vì mỗi salon có service và stylist khác nhau
    localStorage.removeItem('selectedServiceId');
    localStorage.removeItem('selectedServiceName');
    localStorage.removeItem('selectedStylistId');
    localStorage.removeItem('selectedStylistName');
    navigate(-1);
  };


  const renderImg = (
    <Box
      component="img"
      src={salon.imageUrl || 'default-image-url.jpg'}
      alt={salon.address}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
    
  );

  const renderAddress = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
        }}
      >
        {salon.address}

        {salon.phone}
      </Typography>
    </Typography>
  );

  return (
    <Card onClick={handleSelectSalon} sx={{ cursor: 'pointer' }} >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {salon.district}
        </Link>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          {renderAddress}
        </Box>
      </Stack>
    </Card>
  );
}
