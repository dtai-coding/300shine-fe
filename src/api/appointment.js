import axiosClient from './axiosClient';

const appointmentApi = {

  createAppointment: (appointment) => axiosClient.post('/appointment/create', appointment),

  customerGetAppointmentBystatus: (status) => axiosClient.get(`/appointment/list`, { params: { status } })

};

export default appointmentApi;