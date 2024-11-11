import axiosClient from './axiosClient';

const stylistApi = {

    getStylistBySalonIdAndServiceId: (salonId, serviceId) => 
        axiosClient.get(`/Stylist/stylist-by-salonid-and-serviceId`, {
            params: {
                salonId,
                serviceId
            }
        })
    
};

export default stylistApi;