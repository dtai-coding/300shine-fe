import type { ServiceItemProps } from 'src/model/response/service';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';



// ----------------------------------------------------------------------


export function SelectServiceItem({ service }: { service: ServiceItemProps }) {
    const navigate = useNavigate();

    const handleSelectService = () => {
      localStorage.setItem('selectedServiceId', service.id.toString());
      localStorage.setItem('selectedServiceName', service.name.toString());
      localStorage.setItem('selectedServiceDuration', service.duration.toString());
      // console.log(service.id,service.name,service.duration )
      navigate('/appointment'); 
    };

  return (
    <Card onClick={handleSelectService} sx={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          alt={service.name}
          src={service.imageUrl}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }} fontSize={20}>
        {service.name}

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {fCurrency(service.price)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
