import axiosClient from './axiosClient';

const shiftApi = {

    getShift: (salonId, stylistId) =>
        axiosClient.get(`/v1/shift/list-by-salon-id`, {
            params: {
                salonId,
                stylistId
            }
        }),

    stylistChoseShift: (request) => axiosClient.post('/v1/shift/new-shift-for-stylist', request),

};

export default shiftApi;