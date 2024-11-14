import axiosClient from './axiosClient';

const shiftApi = {

    getShift: (salonId, stylistId) => 
        axiosClient.get(`/v1/shift/list-by-salon-id`, {
            params: {
                salonId,
                stylistId
            }
        })
    
};

export default shiftApi;