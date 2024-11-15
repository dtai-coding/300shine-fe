
import type { ServiceItemProps } from 'src/model/response/service';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import serviceApi from 'src/api/serviceApi';
import { HomeContent } from 'src/layouts/home';

import { SelectServiceItem } from '../select-service-item'; 



export function SelectServiceView() {
    const [services, setServices] = useState<ServiceItemProps[]>([]); 

    useEffect(() => {
        const storedSalonId = localStorage.getItem('selectedSalonId');

        const fetchSalons = async () => {
          try {
            const response = await serviceApi.getServicesBySalonId(storedSalonId); 
            const serviceData = response?.data?.services; 
            setServices(serviceData); 
          } catch (error) {
            console.error('Failed to fetch services:', error);
          }
        };
    
        fetchSalons(); 
      }, []);

    return (
        <HomeContent>
            <Typography variant="h2" sx={{ mb: 5 }}>
                Select Salon
            </Typography>

            <Grid container spacing={4}>
                {services.map((service) => (
                    <Grid key={service.id} item xs={12} sm={6} md={4} lg={3}>
                        <SelectServiceItem service={service} />
                    </Grid>
                ))}
            </Grid>
            
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
