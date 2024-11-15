import type { StylistItemProps } from 'src/model/response/stylist';

import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import stylistApi from 'src/api/stylistApi';
import { HomeContent } from 'src/layouts/home';

import { SelectStylistItem } from 'src/sections/select-stylist/select-stylist-item';

import { StylistSort } from '../stylist-sort';
import { StylistFilters } from '../stylist-filters';

import type { FiltersProps } from '../../product/product-filters';


// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
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

export function StylistsView() {
  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);
  

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);
  const [stylists, setStylists] = useState<StylistItemProps[]>([]);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    useEffect(() => {
      const fetchStylists = async () => {
        try {
          const response = await stylistApi.getAllStylists(); // Call API
          const productData = response?.data; // Extract the product data from response.value.data
          const stylistsWithImage = response.data.map((stylist: any) => ({
            ...stylist,
            imageUrl: stylist.imageUrl || 'defaultImageUrl', // Ensure imageUrl is present
          }));
          setStylists(stylistsWithImage); // Set updated stylists to state
          console.log('Successfully fetched stylists:', stylistsWithImage);
        } catch (err) {
      
          console.error('Failed to fetch stylists:', err);
        }
      };
  
      fetchStylists(); // Trigger the API call
    }, []);
  // Auto-scroll effect
  const handleScroll = useCallback(
    (direction: string) => {
      if (scrollRef.current) {
        const itemWidth = 250; // assuming each item has a fixed width of 250px
        let newIndex = currentIndex;
  
        if (direction === 'right') {
          newIndex = currentIndex + 1;
          if (newIndex >= stylists.length) {
            newIndex = 0; // loop back to the start
          }
        } else if (direction === 'left') {
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = stylists.length - 1; // loop to the end
          }
        }
  
        setCurrentIndex(newIndex);
  
        scrollRef.current.scrollTo({
          left: newIndex * itemWidth,
          behavior: 'smooth',
        });
      }
    },
    [currentIndex, stylists.length] // dependencies for handleScroll
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll('right');
    }, 1000); // 3 seconds interval
  
    return () => clearInterval(interval);
  }, [handleScroll]);

  return (
    <HomeContent sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Stylists
      </Typography>

      {/* Left Arrow Button */}
      <IconButton
        onClick={() => handleScroll('left')}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Right Arrow Button */}
      <IconButton
        onClick={() => handleScroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <ArrowForward />
      </IconButton>
      {/* Horizontal Scroll Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          padding: 2,
          overflowX: 'hidden', // Hide the scrollbar
          scrollBehavior: 'smooth',
        }}
      >
        {stylists.map((stylist) => (
          <Box key={stylist.id} sx={{ minWidth: '250px', maxWidth: '250px', flexShrink: 0 }}>
                        {/* <Link to={`/stylist-detail/${stylist.id}`} style={{ textDecoration: 'none' }}> */}

            <SelectStylistItem stylist={stylist} />
            {/* </Link> */}
          </Box>
        ))}
      </Box>

     
      
      

      <Pagination count={5} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </HomeContent>
  );
}


