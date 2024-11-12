import type { StylistItemProps } from 'src/model/response/stylist';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import stylistApi from 'src/api/stylistApi';
import { HomeContent } from 'src/layouts/home';

import { SelectStylistItem } from '../select-stylist-item';



export function SelectStylistView() {
  const [stylists, setStylists] = useState<StylistItemProps[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);

  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const storedServiceId = localStorage.getItem('selectedServiceId');
    setServiceId(Number(storedServiceId));
    console.log(storedSalonId, serviceId);

    const fetchStylists = async () => {
      
      try {
        const response = await stylistApi.getStylistBySalonIdAndServiceId(storedSalonId, storedServiceId);
        const stylistData = response?.data;
        setStylists(stylistData);
        console.log('Successfully fetched stylists:', stylistData);

      } catch (error) {
        console.error('Failed to fetch stylists:', error);
      }
    };

    fetchStylists();
  }, [serviceId]); 


  return (
    <HomeContent>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Select Stylist
      </Typography>

      <Grid container spacing={0}>
        {stylists.map((stylist) => (
          <Grid key={stylist.id} xs={12} sm={6} md={3}>
            <SelectStylistItem stylist={stylist}  />
          </Grid>
        ))}
      </Grid>

      <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </HomeContent>
  );
}