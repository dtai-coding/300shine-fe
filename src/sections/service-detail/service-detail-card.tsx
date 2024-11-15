import type { ServiceItemProps } from 'src/model/response/service';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthStore } from 'src/stores';



export function ServiceDetailItem({ product }: { product: ServiceItemProps }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { auth } = useAuthStore();

  const handleRedirect = () => {
    const logined = auth.accessToken;
    if(logined){
      navigate('/appointment');
    }
    else{
      navigate('/sign-in');
    }
  };
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

        <Stack spacing={2} sx={{ p: 3, width: '60%' }} marginBottom="170px">
          <Typography variant="h2">
            {product.name}
          </Typography>


          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">
              {formatCurrencyVND(product.price)}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.2rem',
              fontWeight: '400',
              textAlign: 'left',
              mt: 3,
              mb: 2,
            }}
          >
            Khám phá các dịch vụ chất lượng cao của chúng tôi, từ các liệu pháp thư giãn cho đến những dịch vụ chuyên biệt giúp bạn tận hưởng sự thoải mái tuyệt vời. Đặt lịch ngay hôm nay để trải nghiệm và chăm sóc bản thân với những dịch vụ tốt nhất!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // endIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleRedirect}
            sx={{
              fontSize: '1.2rem',
              padding: theme.spacing(2, 4),
              borderRadius: '30px',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#1877f2',
              '&:hover': {
                backgroundColor: '#005bb5',
              },
            }}
          >
            TRY NOW
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

function formatCurrencyVND(price: number) {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`;
}