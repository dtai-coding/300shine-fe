import { Box, Button } from '@mui/material';

export function AppointmentManagerProcessTab({
  process,
  onProcessChange,
}: {
  process: string;
  onProcessChange: (newProcess: string) => void;
}) {
  return (
    <Box display="flex" justifyContent="center" gap={2} mb={5}>
      {['Pending', 'In Progress', 'Completed'].map((tabProcess) => (
        <Button
          key={tabProcess}
          variant={process === tabProcess ? 'contained' : 'outlined'}
          onClick={() => onProcessChange(tabProcess)}
        >
          {tabProcess}
        </Button>
      ))}
    </Box>
  );
}
