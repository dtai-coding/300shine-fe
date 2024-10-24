
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { HomeContent } from 'src/layouts/home';

import salonApi from 'src/api/salon';
import { SalonItemProps } from 'src/model/response/salon';
import { SalonItem } from '../select-salon-item';



export function SelectSalonView() {
    const [salons, setSalons] = useState<SalonItemProps[]>([]); 

    useEffect(() => {
        const fetchSalons = async () => {
          try {
            const response = await salonApi.getSalons(); // Call API
            const salonData = response?.data; // Extract the product data from response.value.data
            setSalons(salonData); // Update the products state with data from API
            console.log('Successfully fetched salons:', salonData);
          } catch (error) {
            console.error('Failed to fetch salons:', error);
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
                {salons.map((salon) => (
                    <Grid key={salon.id} xs={12} sm={6} md={2}>
                        <SalonItem salon={salon} />
                    </Grid>
                ))}
            </Grid>
            
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
