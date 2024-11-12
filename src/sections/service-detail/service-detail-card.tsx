import type { ServiceItemProps } from 'src/model/response/service';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';


export function ServiceDetailItem({ product }: { product: ServiceItemProps }) {

  return (
    <Card>
      <Box display="flex" alignItems="center">
        <Box sx={{ width: '40%', height: '500px', position: 'relative' }}>
          <Box
            component="img"
            alt={product.name}
            src={product.imageUrl}
            sx={{
              width: 1,
              height: 1,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Box>
  
        <Stack spacing={2} sx={{ p: 3, width: '60%' }}>
            {product.name}
  
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              {fCurrency(product.price)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
  
  
  }