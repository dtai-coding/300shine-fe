import axiosClient from './axiosClient';

const appointmentApi = {

  createAppointment: (appointment) => axiosClient.post('/appointment/create', appointment),

  customerGetAppointmentBystatus: (status) => axiosClient.get(`/Appointment/list`, { params: { status } }),

  updateAppointmentWithOrderCode: (updateAppointmentWithOrderCode) => axiosClient.put('/manager/update-status', updateAppointmentWithOrderCode),

  stylistGetAppointmentBystatusAndProcess:(status, appoinmentDetailStatus) => axiosClient.get(`/Appoinment/list-by-stylist`, { params: { status, appoinmentDetailStatus } }),
};

export default appointmentApi;