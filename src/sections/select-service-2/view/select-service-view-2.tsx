
import type { ServiceItemProps } from 'src/model/response/service';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import serviceApi from 'src/api/serviceApi';
import { HomeContent } from 'src/layouts/home';

import { SelectServiceItem2 } from '../select-service-item-2'; 



export function SelectServiceView2() {
    const [services, setServices] = useState<ServiceItemProps[]>([]); 

    useEffect(() => {
        const storedStylistId2 = localStorage.getItem('selectedStylistId2');
        const fetchServices = async () => {
          try {
            const response = await serviceApi.getServiceByStylistId(storedStylistId2); 
            const serviceData = response?.data; 
            setServices(serviceData);
          } catch (error) {
            console.error('Failed to fetch services:', error);
          }
        };
    
        fetchServices(); 
      }, []);

    return (
        <HomeContent>
            <Typography variant="h2" sx={{ mb: 5 }}>
                Select Salon
            </Typography>

            <Grid container spacing={0}>
                {services.map((service) => (
                    <Grid key={service.id} xs={12} sm={6} md={2}>
                        <SelectServiceItem2 service={service} />
                    </Grid>
                ))}
            </Grid>
            
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
