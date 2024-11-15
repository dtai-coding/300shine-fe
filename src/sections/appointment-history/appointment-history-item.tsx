import type { PaymentItemProps } from "src/model/response/payment";
import type { AppointmentItemProps } from "src/model/response/appoinment";

import { useState } from "react";

import { Box, Button, Dialog, Collapse, Typography, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import paymentApi from "src/api/paymentApi";

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
        // case "Pending":
        //     return "#f5dd90";
        case "Paid":
            return "#ace8ba";
        case "Canceled":
            return "#f0a5ac";
        default:
            return "#FFFFFF";
    }
}

function getDetailStatusBackgroundColor(status: string) {
    switch (status) {
        case "Pending":
            return "#f5dd90";
        case "Completed":
            return "#ace8ba";
        case "In Progress":
            return "#a5c8f0";
        default:
            return "#FFFFFF";
    }
}

export function AppointmentHistoryItem({ appoinment }: { appoinment: AppointmentItemProps }) {
    const [open, setOpen] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    // const [orderCode, setOrderCode] = useState<number | null>(appoinment.orderCode);
    // const [amount, setAmount] = useState<number | null>(2000);

    const handleCheckoutClick = () => {
        setOpenConfirmDialog(true);
    };

    const handleConfirm = async () => {
        try {
            // const accessToken = localStorage.getItem('accessToken');
            // if (accessToken) {
            console.log(appoinment.orderCode);
            let response;

            if (appoinment.orderCode) {
                response = await paymentApi.createPaymentForPendingAppointment(appoinment.orderCode, 2000);
            }
            const payment: PaymentItemProps = response?.data;

            if (payment && payment.checkoutUrl) {
                window.location.href = payment.checkoutUrl;
            }
            // } else {
            //     navigate('/sign-in');
            // }

            setOpenConfirmDialog(false);
        } catch (error) {
            console.log(error.message)
        }
    };


    const handleCancel = () => {
        setOpenConfirmDialog(false);
    };

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
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                sx={{
                                    backgroundColor: getDetailStatusBackgroundColor(detail.status),
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                }}
                            >
                                Status: {detail.status}
                            </Typography>
                            </Box>
                        </Box>
                    ))}

                    {/* {appoinment.status === "Pending" && (
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCheckoutClick}>
                            Process to checkout
                        </Button>
                    )} */}
                </Box>
            </Collapse>
            <Dialog open={openConfirmDialog} onClose={handleCancel}>
                <DialogTitle>Checkout Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want continue to checkout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
