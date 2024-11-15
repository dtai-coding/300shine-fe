
import type { SalonItemProps } from 'src/model/response/salon';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import salonApi from 'src/api/salonApi';
import { HomeContent } from 'src/layouts/home';

import { SalonItem } from '../select-salon-item';



export function SelectSalonView() {
    const [salons, setSalons] = useState<SalonItemProps[]>([]); 

    useEffect(() => {
        const fetchSalons = async () => {
          try {
            const response = await salonApi.getSalons(); 
            const salonData = response?.data; 
            setSalons(salonData);
          } catch (error) {
            console.error('Failed to fetch salons:', error);
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
    {salons.map((salon) => (
      <Grid key={salon.id} item xs={12} sm={6} md={4} lg={3}>
        <SalonItem salon={salon} />
      </Grid>
    ))}
  </Grid>
            
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
