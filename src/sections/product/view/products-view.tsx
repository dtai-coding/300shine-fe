import type { ServiceItemProps } from 'src/model/response/service';

import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { useAuthStore } from 'src/stores';
import serviceApi from 'src/api/serviceApi';
import { HomeContent } from 'src/layouts/home';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

export function ProductsView() {
  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);
  const [products, setProducts] = useState<ServiceItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const productsPerPage = 8; // Adjust this number as needed
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await serviceApi.getServices(); // Call API
        const productData = response?.data; // Extract the product data from response.value.data
        setProducts(productData); // Update the products state with data from API
        setTotalPages(Math.ceil(productData.length / productsPerPage)); // Calculate total pages
        console.log('Successfully fetched products:', productData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts(); // Trigger the API call
  }, []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  const { auth } = useAuthStore();

  const handleRedirect = () => {
    const logined = auth.accessToken;
    if (logined) {
      navigate('/appointment');
    } else {
      navigate('/sign-in');
    }
  };

  const theme = useTheme();

  // Paginate products based on currentPage
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <HomeContent>
      <Box marginTop="50px" display="flex" alignItems="center" mb={5}>
        <Typography variant="h2" flexGrow={1}>
          Services
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleRedirect}
          sx={{
            fontSize: '1.2rem',
            padding: theme.spacing(2, 4),
            borderRadius: '30px',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#1877f2',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
        >
          Make Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <Link to={`/service-detail/${product.id}`} style={{ textDecoration: 'none' }}>
              <ProductItem product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        color="primary"
        sx={{ mt: 8, mx: 'auto' }}
      />
    </HomeContent>
  );
}
