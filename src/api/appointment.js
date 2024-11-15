import axiosClient from './axiosClient';

const appointmentApi = {
  createAppointment: (appointment) => axiosClient.post('/appointment/create', appointment),

  customerGetAppointmentBystatus: (status, appoinmentDetailStatus) =>
    axiosClient.get(`/Appointment/list`, { params: { status, appoinmentDetailStatus } }),

  updateAppointmentWithOrderCode: (updateAppointmentWithOrderCode) =>
    axiosClient.put('/manager/update-status', updateAppointmentWithOrderCode),

  stylistGetAppointmentBystatusAndProcess: (status, appoinmentDetailStatus) =>
    axiosClient.get(`/Appointment/list-by-stylist`, { params: { status, appoinmentDetailStatus } }),

  updateAppointmentProcess: (request) => axiosClient.put('/manager/update-status-by-ID', request),

  getAppointment: (status, process) =>
    axiosClient.get(`/Appointment/list-by-status`, { params: { status, process } }),
};

export default appointmentApi;
