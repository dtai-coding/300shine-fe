import type { AppointmentItemProps } from "src/model/response/appoinment";

import { useState, useEffect } from "react";

import { Grid, Typography } from "@mui/material";

import { HomeContent } from "src/layouts/home";
import appointmentApi from "src/api/appointment";

import { AppointmentHistoryItem } from "../appointment-history-item";
import { AppointmentHistoryTab } from "../appoinmet-history-status-tab";


export function AppointmentHistoryView() {
    const [appointments, setAppointments] = useState<AppointmentItemProps[]>([]);
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                console.log(status);
                const response = await appointmentApi.customerGetAppointmentBystatus(status);
                const appointmentData: AppointmentItemProps[] = response?.data;
                setAppointments(appointmentData);
                console.log(appointmentData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAppointments();
    }, [status]);

    return (
        <HomeContent>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Appointment History
            </Typography>
            
            <AppointmentHistoryTab status={status} onStatusChange={setStatus} />

            

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