import type { SlotItemProps } from 'src/model/response/slot'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';




// ----------------------------------------------------------------------


export function SelectSlotItem({ slot }: { slot: SlotItemProps }) {
    // Manually adjust the time by subtracting hours
    const adjustedTime = new Date(new Date(slot.time).getTime() - 7 * 60 * 60 * 1000);
    const displayTime = adjustedTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  
    const handleSelectSlot = () => {
      localStorage.setItem('selectedSlotId', slot.id.toString());
    };
  
    return (
      <Card onClick={handleSelectSlot} sx={{ cursor: 'pointer', width: '80px', margin: '8px' }}>
        <Stack spacing={2} sx={{ p: 1 }} fontSize={18} alignItems="center">
          <Typography variant="subtitle1">
            {displayTime}h
          </Typography>
        </Stack>
      </Card>
    );
  }