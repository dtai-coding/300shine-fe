import type { SlotItemProps } from 'src/model/response/slot';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SelectSlotItem({
  slot,
  selectedSlotIds,
  onSelect
}: {
  slot: SlotItemProps;
  selectedSlotIds: number[];
  onSelect: (id: number) => void;
}) {
  const adjustedTime = new Date(new Date(slot.time).getTime() - 7 * 60 * 60 * 1000);
  const displayTime = adjustedTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const handleClick = () => {
    if (slot.status) {
      onSelect(slot.id);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: slot.status ? 'pointer' : 'not-allowed',
        width: '80px',
        margin: '8px',
        backgroundColor: selectedSlotIds.includes(slot.id) ? '#b3e5fc' : slot.status ? 'white' : 'lightgray',
        color: slot.status ? 'black' : 'gray',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: slot.status ? '#e0f7fa' : 'lightgray',
        },
      }}
    >
      <Stack spacing={2} sx={{ p: 1 }} fontSize={18} alignItems="center">
        <Typography variant="subtitle1">{displayTime}</Typography>
      </Stack>
    </Card>
  );
}

