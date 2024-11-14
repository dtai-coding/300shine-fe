import axiosClient from './axiosClient';

const appointmentApi = {

  createAppointment: (appointment) => axiosClient.post('/appointment/create', appointment),

  customerGetAppointmentBystatus: (status) => axiosClient.get(`/appointment/list`, { params: { status } }),

  updateAppointmentWithOrderCode: (updateAppointmentWithOrderCode) => axiosClient.put('/manager/update-status', updateAppointmentWithOrderCode)

};

export default appointmentApi;