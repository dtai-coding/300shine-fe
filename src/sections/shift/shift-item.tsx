import { Box, Checkbox, Typography } from "@mui/material";
import { ShiftItemProps } from "src/model/response/shift";


function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

function formatTime(slotString: string) {
    const adjustedTime = new Date(new Date(slotString).getTime() - 7 * 60 * 60 * 1000);
    return adjustedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}


export function ShiftItem({
    shift,
    onCheckboxChange,
    isChecked,
}: {
    shift: ShiftItemProps;
    onCheckboxChange: (id: number, isChecked: boolean) => void;
    isChecked: boolean;
}) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(shift.id, event.target.checked);
    };

    return (
        <Box display="flex" alignItems="center" border={1} borderRadius={2} p={2}>
            <Checkbox
                checked={isChecked}
                onChange={handleChange}
                disabled={shift.isChosen}
                sx={{
                    background: shift.isChosen ? "gray" : "default", 
                    "&.Mui-disabled": {
                        color: "gray", 
                    },
                }}
            />

            <Box ml={2}>
                <Typography variant="h6">{shift.name}</Typography>
                <Typography>Date: {formatDate(shift.date)}</Typography>
                <Typography>Start Time: {formatTime(shift.startTime)}</Typography>
                <Typography>End Time: {formatTime(shift.endTime)}</Typography>
            </Box>
        </Box>
    );
}
