import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type SalonProps = {
  id: number;
  fullName: string | null;
  dateOfBirth: string | null;
  gender: boolean | null;
  phone: string | null;
  address: string | null;
  isVerified: boolean | null;
  status: string | null;
  salonId: number | null;
  roleName: string | null;
  imageUrl: string | null;
  commission: number | null;
  salary: number | null;
  salaryPerDay: number | null;
};

type SalonTableRowProps = {
  row: SalonProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function SalonTableRow({ row, selected, onSelectRow }: SalonTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Helper function to display fallback value for missing data
  const getDisplayValue = (value: any) => (value !== null && value !== undefined ? value : '-');

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.fullName || '-'} src={row.imageUrl || ''} />
            {getDisplayValue(row.fullName)}
          </Box>
        </TableCell>

        <TableCell>{getDisplayValue(row.dateOfBirth)}</TableCell>
        <TableCell>
          {getDisplayValue(row.gender !== null ? (row.gender ? 'Male' : 'Female') : '-')}
        </TableCell>
        <TableCell>{getDisplayValue(row.phone)}</TableCell>
        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>
            {getDisplayValue(row.status)}
          </Label>
        </TableCell>
        <TableCell>{getDisplayValue(row.salonId)}</TableCell>
        <TableCell>{getDisplayValue(row.roleName)}</TableCell>

        <TableCell>{getDisplayValue(row.commission)}</TableCell>
        <TableCell>{getDisplayValue(row.salary)}</TableCell>
        <TableCell>{getDisplayValue(row.salaryPerDay)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
