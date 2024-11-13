import type { StylistItemProps } from 'src/model/response/stylist';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import stylistApi from 'src/api/stylistApi';
import { HomeContent } from 'src/layouts/home';

import { SelectStylistItem2 } from '../select-stylist-item-2';



export function SelectStylistView2() {
  const [stylists, setStylists] = useState<StylistItemProps[]>([]);

  useEffect(() => {
    const storedSalonId = localStorage.getItem('selectedSalonId');
    const fetchStylists = async () => {
      try {
        const response = await stylistApi.getStylistsBySalonId(storedSalonId);
        const stylistData = response?.data;
        setStylists(stylistData);
        console.log('Successfully fetched stylists:', stylistData);

      } catch (error) {
        console.error('Failed to fetch stylists:', error);
      }
    };

    fetchStylists();
  }, []);


  return (
    <HomeContent>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Select Stylist
      </Typography>



      {stylists ? (
        <Grid container spacing={0}>
          {stylists.map((stylist) => (
            <Grid key={stylist.id} xs={12} sm={6} md={3}>
              <SelectStylistItem2 stylist={stylist} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ mb: 5 }} color="red">
          No Stylist found in this salon
        </Typography>
      )
      }

      <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </HomeContent >
  );
}