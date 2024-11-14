import type { AppointmentItemProps } from "src/model/response/appoinment";
import { useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";

// Hàm format ngày theo định dạng DD-MM-YYYY
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

function formatTime(slotString: string) {
    const adjustedTime = new Date(new Date(slotString).getTime() - 7 * 60 * 60 * 1000);
    return adjustedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

// Hàm trả về màu nền dựa trên trạng thái
function getStatusBackgroundColor(status: string) {
    switch (status) {
        case "Pending":
            return "#f5dd90"; 
        case "Paid":
            return "#ace8ba"; 
        case "Canceled":
            return "#f0a5ac"; // màu đỏ nhạt
        default:
            return "#FFFFFF"; // màu trắng mặc định
    }
}

export function AppointmentHistoryItem({ appoinment }: { appoinment: AppointmentItemProps }) {
    const [open, setOpen] = useState(false);

    return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Order Code: {appoinment.orderCode}</Typography>
                <Typography
                    sx={{
                        backgroundColor: getStatusBackgroundColor(appoinment.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                    }}
                >
                    Status: {appoinment.status}
                </Typography>
                <Button variant="text" onClick={() => setOpen(!open)}>
                    {open ? "Hide Details" : "Show Details"}
                </Button>
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box mt={2}>
                    <Typography>Salon Address: {appoinment.salonAddress}</Typography>
                    <Typography>User Name: {appoinment.userName}</Typography>
                    <Typography>Total Amount: {appoinment.amount}</Typography>
                    <Typography>Date: {formatDate(appoinment.date)}</Typography>

                    {appoinment.appointmentDetails.map((detail) => (
                        <Box key={detail.appointmentId} mt={2} pl={2} borderTop={1} pt={1}>
                            <Typography>Service Name: {detail.serviceName}</Typography>
                            <Typography>Stylist: {detail.stylistName}</Typography>
                            <Typography>Return Date: {formatDate(detail.returnDate)}</Typography>
                            <Typography>Price: {detail.price}</Typography>
                            <Typography>Slot list: </Typography>
                            {detail.appointmentDetailSlots.map((slot) => (
                                <Box key={slot.slotId} pl={2}>
                                    <Typography>Slot: {formatTime(slot.slot)}</Typography>
                                </Box>
                            ))}
                        </Box>
                    ))}

                    {appoinment.status === "Pending" && (
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Process to checkout
                        </Button>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
}
