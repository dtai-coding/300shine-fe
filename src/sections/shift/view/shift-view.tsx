import type { ShiftItemProps } from "src/model/response/shift";
import type { ShiftStylistProps } from "src/model/request/shift-stylist";

import { useState, useEffect } from "react";

import { Box, Grid, Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";

import shiftApi from "src/api/shiftApi";
import { StylistConTent } from "src/layouts/stylist";

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

            const shiftStylist: ShiftStylistProps = {
                shiftIds: selectedShiftIds, 
            };
            const response = await shiftApi.stylistChoseShift(shiftStylist);
            if(response.status){
                setSelectedShiftIds([]);
                const response2 = await shiftApi.getShift();
                const shiftData: ShiftItemProps[] = response2?.data;
                setShifts(shiftData);
            }

            setOpenConfirmDialog(false);
        } catch (error) {
            console.log(error.message);
            setOpenConfirmDialog(false);

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