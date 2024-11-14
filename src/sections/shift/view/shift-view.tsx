import { useEffect, useState } from "react";
import { Grid, Typography, Checkbox, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Iconify } from "src/components/iconify";
import shiftApi from "src/api/shiftApi";
import { ShiftStylistProps } from "src/model/request/shift-stylist";

import { StylistConTent } from "src/layouts/stylist";
import { ShiftItemProps } from "src/model/response/shift";
import { ShiftItem } from "../shift-item";


export function ShiftView() {
    const [shifts, setShifts] = useState<ShiftItemProps[]>([]);
    const [selectedShiftIds, setSelectedShiftIds] = useState<number[]>([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await shiftApi.getShift();
                const shiftData: ShiftItemProps[] = response?.data;
                setShifts(shiftData);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchShifts();
    }, []);

    const handleDoneClick = () => {
        setOpenConfirmDialog(true);
    };

    const handleConfirm = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {

                // const shiftStylist: ShiftStylistProps = {
                //     shi: salonId ?? 0,
                //     dateToGo: date ? new Date(formatDateToISO(date)).toISOString() : '',
                //     items: [
                //         {
                //             serviceId: serviceId ?? 0,
                //             stylistId: stylistId ?? 0,
                //             slots: slotIds.map(id => ({ id }))
                //         }
                //     ]
                // };

                // console.log(appointment);
                // console.log(appointment2);

                // let response;
                // if (appointment && isAppointmentValid(appointment)) {
                //     response = await appointmentApi.createAppointment(appointment);
                // } else if (appointment2 && isAppointmentValid(appointment2)) {
                //     response = await appointmentApi.createAppointment(appointment2);
                // } else {
                //     showAlert('Appointment is not valid');
                //     return;
                // }

                // const payment: PaymentItemProps = response?.data;

                // if (payment && payment.checkoutUrl) {
                //     window.location.replace(payment.checkoutUrl);
                // }

            } else {
                // navigate('/sign-in');
            }

            setOpenConfirmDialog(false);
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleCancel = () => {
        setOpenConfirmDialog(false);
    };

    const handleCheckboxChange = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedShiftIds([...selectedShiftIds, id]);
            console.log(selectedShiftIds);
        } else {
            setSelectedShiftIds(selectedShiftIds.filter((shiftId) => shiftId !== id));
            console.log(selectedShiftIds);

        }
    };

    const shiftsByDate = shifts.reduce((acc: Record<string, ShiftItemProps[]>, shift) => {
        const dateKey = shift.date.split("T")[0]; // Lấy phần ngày
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(shift);
        return acc;
    }, {});

    return (
        <StylistConTent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mx="45px">
                <Typography variant="h2">
                    Services
                </Typography>
                <Box marginRight="250px">
                    <Button
                        variant="contained"
                        color="primary"
                    onClick={handleDoneClick}
                    >
                        Confirm to choose shift
                    </Button>
                </Box>
            </Box>

            {Object.keys(shiftsByDate).map((date) => (
                <Box key={date} mb={3}>
                    <Typography marginLeft="70px" variant="h6" gutterBottom>
                        Date: {formatDate(date)}
                    </Typography>
                    <Grid marginLeft="100px" container spacing={2}>
                        {shiftsByDate[date].map((shift) => (
                            <Grid item xs={8} key={shift.id}>
                                <ShiftItem
                                    shift={shift}
                                    onCheckboxChange={handleCheckboxChange}
                                    isChecked={selectedShiftIds.includes(shift.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            <Dialog open={openConfirmDialog} onClose={handleCancel}>
                <DialogTitle>Choose Shift Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to make selection with these shifts?
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
        </StylistConTent>
    );
}
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}