import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { StylistItemProps } from 'src/model/response/stylist';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------



export function StylistItem({ product }: { product: StylistItemProps }) {
  const renderName = (
    <Label
      variant="inverted"
      color={(product.name === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.name}
    </Label>
  );

  const renderImg = (
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
  );


  return (
    <Card sx={{ width: 220, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
    <Box sx={{ pt: '100%', position: 'relative' }}>
      {product.name && renderName}
      {renderImg}
    </Box>

    <Stack spacing={1.5} sx={{ p: 2 }}>
      <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        {product.name}
      </Link>
    </Stack>
  </Card>
);
}
