import { Box, Button } from "@mui/material";

export function AppointmentStylistStatusTab({ status, onStatusChange }: { status: string; onStatusChange: (newStatus: string) => void }) {
    return (
        <Box display="flex" justifyContent="center" gap={2} mb={5}>
            {[ "Paid"].map((tabStatus) => (
                <Button
                    key={tabStatus}
                    variant={status === tabStatus ? "contained" : "outlined"}
                    onClick={() => onStatusChange(tabStatus)}
                >
                    {tabStatus}
                </Button>
            ))}
        </Box>
    );
}