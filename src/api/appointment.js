import axiosClient from './axiosClient';

const appointmentApi = {

  createAppointment: (appointment) => axiosClient.post('/appointment/create', appointment)

};

export default appointmentApi;