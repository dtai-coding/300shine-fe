import type { AppointmentItemProps } from 'src/model/response/appoinment';

import { useState, useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import appointmentApi from 'src/api/appointment';
import { StylistConTent } from 'src/layouts/stylist';

import { AppointmentManagerItem } from '../appointment-manager-item';
import { AppointmentManagerStatusTab } from '../appoinmet-manager-status-tab';
import { AppointmentManagerProcessTab } from '../appoinmet-manager-process-tab';

export function AppointmentManagerView() {
  const [appointments, setAppointments] = useState<AppointmentItemProps[]>([]);
  const [status, setStatus] = useState('Paid');
  const [process, setProcess] = useState('Pending');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log(status);
        const response = await appointmentApi.getAppointment(status, process);
        const appointmentData: AppointmentItemProps[] = response?.data;
        setAppointments(appointmentData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAppointments();
  }, [status, process]);

  const handleReload = () => {
    const fetchAppointments = async () => {
      try {
        console.log(status);
        const response = await appointmentApi.getAppointment(status, process);
        const appointmentData: AppointmentItemProps[] = response?.data;
        setAppointments(appointmentData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAppointments();
  };

  return (
    <StylistConTent>
      <Typography marginLeft="60px" variant="h2" sx={{ mb: 3 }}>
        Appointments
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box marginLeft="60px" display="flex" alignItems="center" gap={1}>
          <Typography marginBottom="30px" variant="h4">
            Status:
          </Typography>
          <AppointmentManagerStatusTab status={status} onStatusChange={setStatus} />
        </Box>

        <Box marginRight="300px" display="flex" alignItems="center" gap={1}>
          <Typography marginBottom="30px" variant="h4">
            Process:
          </Typography>
          <AppointmentManagerProcessTab process={process} onProcessChange={setProcess} />
        </Box>
      </Box>

      <Grid marginLeft="45px" container spacing={2}>
        {appointments.map((appointment) => (
          <Grid item xs={8} key={appointment.orderCode}>
            <AppointmentManagerItem appointment={appointment} reloadCallBack={handleReload} />
          </Grid>
        ))}
      </Grid>
    </StylistConTent>
  );
}
