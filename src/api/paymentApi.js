
import axiosClient from './axiosClient';

const paymentApi = {
    createPayment: (paymentData) => axiosClient.post('/api/Payment', paymentData),

    createPaymentForPendingAppointment: (orderCode, amount) => axiosClient.get(`/payment`, { params: { orderCode, amount} })

};

export default paymentApi;