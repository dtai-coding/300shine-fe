import type { AppointmentItemProps } from "src/model/response/appoinment";
import type { UpdateProcessProps } from "src/model/request/update-process";

import { useState } from "react";

import { Box, Button, Dialog, Collapse, Typography, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import appointmentApi from "src/api/appointment";

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
            return "#b1d9fa";
        default:
            return "#FFFFFF";
    }
}

export function AppointmentStylistItem({ appointment, reloadCallBack }: { appointment: AppointmentItemProps; reloadCallBack(): void }) {
    const [open, setOpen] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    const [process, setProcess] = useState<string | null>(null);

    const handleAcceptClick = async () => {
        try {
            if (selectedDetailId) {
                const updateProcess: UpdateProcessProps = {
                    appointmentId: selectedDetailId,
                    status: "In Progress",
                };
                const response = await appointmentApi.updateAppointmentProcess(updateProcess);
                if (response.status) {
                    setSelectedDetailId(null);
                    reloadCallBack();
                }
            }
            setOpenConfirmDialog(false);
        } catch (error) {
            console.log(error.message);
            setOpenConfirmDialog(false);
        }
    };

    const handleCompleteClick = async () => {
        try {
            if (selectedDetailId) {
                const updateProcess: UpdateProcessProps = {
                    appointmentId: selectedDetailId,
                    status: "Completed",
                };
                console.log(updateProcess);
                const response = await appointmentApi.updateAppointmentProcess(updateProcess);
                if (response.status) {
                    setSelectedDetailId(null);
                    reloadCallBack();

                }
            }
            setOpenConfirmDialog(false);
            
        } catch (error) {
            console.log(error.message);
            setOpenConfirmDialog(false);
        }
    };

    const openConfirmDialogForDetail = (appointmentId: number, currentProcess: string) => {
        setProcess(currentProcess)
        setSelectedDetailId(appointmentId); 
        setOpenConfirmDialog(true);
    };

    return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Order Code: {appointment.orderCode}</Typography>
                <Typography
                    sx={{
                        backgroundColor: getStatusBackgroundColor(appointment.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                    }}
                >
                    Status: {appointment.status}
                </Typography>
                <Button variant="text" onClick={() => setOpen(!open)}>
                    {open ? "Hide Details" : "Show Details"}
                </Button>
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box mt={2}>
                    <Typography>Salon Address: {appointment.salonAddress}</Typography>
                    <Typography>User Name: {appointment.userName}</Typography>
                    <Typography>Total Amount: {appointment.amount}</Typography>
                    <Typography>Date: {formatDate(appointment.date)}</Typography>

                    {appointment.appointmentDetails.map((detail) => (
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
                                {detail.status === "Pending" && (
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => openConfirmDialogForDetail(detail.appointmentId, detail.status)}>
                                        Accept
                                    </Button>
                                )}
                                {detail.status === "In Progress" && (
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => openConfirmDialogForDetail(detail.appointmentId, detail.status)}>
                                        Complete
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Collapse>
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update the status of this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="error">
                        Cancel
                    </Button>
                    <Button onClick={selectedDetailId && process === "Pending" ? handleAcceptClick : handleCompleteClick} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
