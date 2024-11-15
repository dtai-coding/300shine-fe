import type { AppointmentItemProps } from "src/model/response/appoinment";

import { useState, useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";

import { HomeContent } from "src/layouts/home";
import appointmentApi from "src/api/appointment";

import { AppointmentHistoryItem } from "../appointment-history-item";
import { AppointmentHistoryTab } from "../appoinmet-history-status-tab";
import { AppointmentHistoryProcessTab } from "../appointment-history-process-tab";



export function AppointmentHistoryView() {
    const [appointments, setAppointments] = useState<AppointmentItemProps[]>([]);
    const [status, setStatus] = useState("Paid");
    const [process, setProcess] = useState("Pending");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                console.log(status);
                const response = await appointmentApi.customerGetAppointmentBystatus(status, process);
                const appointmentData: AppointmentItemProps[] = response?.data;
                setAppointments(appointmentData);
                console.log(appointmentData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAppointments();
    }, [status, process]);

    return (
        <HomeContent>
            <Typography variant="h2" sx={{ mb: 3 }}>
                Appointment History
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box marginLeft="60px" display="flex" alignItems="center" gap={1}>
                    <Typography marginBottom="30px" variant="h4">Status:</Typography>
                    <AppointmentHistoryTab status={status} onStatusChange={setStatus} />
                </Box>

                <Box marginRight="300px" display="flex" alignItems="center" gap={1}>
                    <Typography marginBottom="30px" variant="h4">Process:</Typography>
                    <AppointmentHistoryProcessTab process={process} onProcessChange={setProcess} />
                </Box>
            </Box>

            

            <Grid container spacing={2}>
                {appointments.map((appointment) => (
                    <Grid item xs={12} key={appointment.orderCode}>
                        <AppointmentHistoryItem appoinment={appointment} />
                    </Grid>
                ))}
            </Grid>
        </HomeContent>
    );
}