
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _products } from 'src/_mock';
import { HomeContent } from 'src/layouts/home';

import { SalonItem } from '../select-salon-item';


export function SelectSalonView() {
    return (
        <HomeContent>
            <Typography variant="h2" sx={{ mb: 5 }}>
                Select Salon
            </Typography>

            <Grid container spacing={0}>
                {_products.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={2}>
                        <SalonItem product={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
        </HomeContent>
    );
}
