import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

export function AppointmentSalon() {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/select-salon');
  };

  return (
    <Box
      sx={{
        padding: 3,          // Khoảng cách giữa nội dung và viền (padding)
        boxShadow: 3,        // Thêm hiệu ứng shadow
        borderRadius: 2,     // Bo góc nhẹ
        backgroundColor: '#fff', // Đặt màu nền cho Box
        maxWidth: 700,       // Giới hạn độ rộng của Box
      }}
    >
      <Typography variant="h5" mb={2}>
        Select Salon
      </Typography>
      
      <Link
        color="inherit"
        underline="hover"
        variant="subtitle1"
        noWrap
        sx={{ cursor: 'pointer' }}
        onClick={handleRedirect}
      >
        Choose Salon
      </Link>
    </Box>
  );
}
