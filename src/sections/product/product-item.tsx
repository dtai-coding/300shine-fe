import type { ServiceItemProps } from 'src/model/response/service';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------


export function ProductItem({ product }: { product: ServiceItemProps }) {

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          alt={product.name}
          src={product.imageUrl}
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
        {product.name}

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
          {formatCurrencyVND(product.price)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
function formatCurrencyVND(price : number) {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`;
}
