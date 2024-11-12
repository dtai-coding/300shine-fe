import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

export function AppointmentBackground() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",  // Căn giữa theo chiều ngang
        alignItems: "center",      // Căn giữa theo chiều dọc
        height: "100vh",           // Chiếm toàn bộ chiều cao của viewport
      }}
    >
      <Card
        sx={{
          width: 700,  // Kích thước rộng của card
          height: 700, // Kích thước cao của card
          padding: 2,  // Padding bên trong card
          boxShadow: 3 // Để thêm hiệu ứng bóng cho card
        }}
      />

    </Box>
  )
}