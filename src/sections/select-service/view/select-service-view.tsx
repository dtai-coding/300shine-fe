
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { HomeContent } from 'src/layouts/home';

import serviceApi from 'src/api/serviceApi';
import { ServiceItemProps } from 'src/model/response/service';
import { SelectServiceItem } from '../select-service-item'; 



export function SelectServiceView() {
    const [services, setServices] = useState<ServiceItemProps[]>([]); 

    useEffect(() => {
        const storedSalonId = localStorage.getItem('selectedSalonId');

        const fetchSalons = async () => {
          try {
            const response = await serviceApi.getServicesBySalonId(storedSalonId); // Call API
            const serviceData = response?.data?.services; // Extract the product data from response.value.data
            setServices(serviceData); // Update the products state with data from API
            console.log('Successfully fetched services:', serviceData);
          } catch (error) {
            console.error('Failed to fetch services:', error);
          }
        };
    
        fetchSalons(); // Trigger the API call
      }, []);

    return (
        <HomeContent>
            <Typography variant="h2" sx={{ mb: 5 }}>
                Select Salon
            </Typography>

            <Grid container spacing={0}>
                {services.map((service) => (
                    <Grid key={service.id} xs={12} sm={6} md={2}>
                        <SelectServiceItem service={service} />
                    </Grid>
                ))}
            </Grid>
            
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
