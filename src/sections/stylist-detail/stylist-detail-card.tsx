
import type { StylistItemProps } from 'src/model/response/stylist';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';



export function StylistDetailItem({ stylist }: { stylist: StylistItemProps }) {

  return (
    <Card>
      <Box display="flex" alignItems="center">
        <Box sx={{ width: '40%', height: '500px', position: 'relative' }}>
          <Box
            component="img"
            alt={stylist.name}
            src={stylist.imageUrl}
            sx={{
              width: 1,
              height: 1,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Box>
  
        <Stack spacing={2} sx={{ p: 3, width: '60%' }}>
            {stylist.name}
  
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {/* <Typography variant="subtitle1">
              {fCurrency(stylist.price)}
            </Typography> */}
          </Box>
        </Stack>
      </Box>
    </Card>
  );
  
  
  }