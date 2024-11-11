import axiosClient from './axiosClient';

const slotApi = {

    getSlotByStylistIdSalonIdServiceIdDate: (stylistId, salonId, serviceId, date) => 
        axiosClient.get(`/Stylist/slot-by-stylistId`, {
            params: {
                stylistId,
                salonId,
                serviceId,
                date
            }
        })
    
};

export default slotApi;