import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function AppointmentServiceStylistSlot() {
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
        Select Service, Stylist, and Slot
      </Typography>
      <Typography variant="h6" mb={2}>
          Service
      </Typography>
    </Box>
  );
}