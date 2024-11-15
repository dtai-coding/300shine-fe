import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import stylistApi from 'src/api/stylistApi';
import { HomeContent } from 'src/layouts/home';
import { SelectStylistItem } from 'src/sections/select-stylist/select-stylist-item';
import { StylistItemProps } from 'src/model/response/stylist';

export function StylistsView() {
  const [stylists, setStylists] = useState<StylistItemProps[]>([]);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(
    (direction: string) => {
      if (scrollRef.current) {
        const itemWidth = 250;
        let newIndex = currentIndex;

        if (direction === 'right') {
          newIndex = (currentIndex + 1) % stylists.length;
        } else if (direction === 'left') {
          newIndex = (currentIndex - 1 + stylists.length) % stylists.length;
        }

        setCurrentIndex(newIndex);

        scrollRef.current.scrollTo({
          left: newIndex * itemWidth,
          behavior: 'smooth',
        });
      }
    },
    [currentIndex, stylists.length]
  );

  const startAutoScroll = useCallback((): void => {
    autoScrollInterval.current = setInterval(() => {
      handleScroll('right');
    }, 2000);
  }, [handleScroll]);

  const stopAutoScroll = useCallback((): void => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await stylistApi.getAllStylists();
        const stylistsWithImage = response.data.map((stylist: StylistItemProps) => ({
          ...stylist,
          imageUrl: stylist.imageUrl || 'defaultImageUrl',
        }));
        setStylists(stylistsWithImage);
      } catch (err) {
        console.error('Failed to fetch stylists:', err);
      }
    };

    fetchStylists();
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <HomeContent sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Stylists
      </Typography>

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

      <Box
        ref={scrollRef}
        sx={{ display: 'flex', gap: 2, padding: 2, overflowX: 'hidden', scrollBehavior: 'smooth' }}
      >
        {stylists.map((stylist) => (
          <Box key={stylist.id} sx={{ minWidth: '250px', maxWidth: '250px', flexShrink: 0 }}>
            <SelectStylistItem stylist={stylist} />
          </Box>
        ))}
      </Box>
    </HomeContent>
  );
}
