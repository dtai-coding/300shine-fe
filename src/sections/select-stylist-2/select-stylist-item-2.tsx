import type { StylistItemProps } from 'src/model/response/stylist';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';




// ----------------------------------------------------------------------


export function SelectStylistItem2({ stylist }: { stylist: StylistItemProps; }) {
  const navigate = useNavigate();

  const handleSelectStylist = () => {
    localStorage.setItem('selectedStylistId2', stylist.id.toString());
    localStorage.setItem('selectedStylistName2', stylist.name.toString());
    navigate('/appointment'); 
  };


  return (
    <Card onClick={handleSelectStylist} sx={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          alt={stylist.name}
          src={stylist.imageUrl}
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
        {stylist.name}
      </Stack>
    </Card>
  );
}