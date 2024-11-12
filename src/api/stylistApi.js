import axiosClient from './axiosClient';

const stylistApi = {
    getAllStylists: () => axiosClient.get(`/Stylist/list`), 
    getStylistBySalonIdAndServiceId: (salonId, serviceId) => 
        axiosClient.get(`/Stylist/stylist-by-salonid-and-serviceId`, {
            params: {
                salonId,
                serviceId
            }
        }),
    
    
};

export default stylistApi;