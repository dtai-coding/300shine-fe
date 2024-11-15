import type { UserProps } from 'src/model/response/User';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onEditUser: (user: UserProps) => void;
  onDeleteUser: (userId: number) => void;
};

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onEditUser,
  onDeleteUser,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const getDisplayValue = (value: any) => {
    if (value !== null && value !== undefined) {
      // Check if the value is a date string and format it if necessary
      if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
        const date = new Date(value);
        return date.toISOString().split('T')[0]; // Format to "YYYY-MM-DD"
      }
      return value; // Return the value as is if it's not a date
    }
    return '-';
  };

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
        <TableCell>{getDisplayValue(row.address)}</TableCell>
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
        <TableCell>{getDisplayValue(row.salonName)}</TableCell>
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
        <MenuList disablePadding sx={{ width: 140 }}>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onEditUser(row);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onDeleteUser(row.id);
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
