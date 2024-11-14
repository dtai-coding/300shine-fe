import type { ServiceViewProps } from 'src/model/response/service';

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

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ServiceTableRowProps = {
  row: ServiceViewProps;
  selected: boolean;
  onSelectRow: () => void;
  onEditService: (service: ServiceViewProps) => void;
  onDeleteService: (serviceId: number) => void;
};

export function ServiceTableRow({
  row,
  selected,
  onSelectRow,
  onEditService,
  onDeleteService,
}: ServiceTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Helper function to display fallback value for missing data
  const getDisplayValue = (value: any) => (value !== null && value !== undefined ? value : '-');

  const getServiceStyles = () =>
    row.serviceStyles.map((style, index) => (
      <span key={index}>{style.styleId !== null ? `${style.styleId}` : 'No Style'}</span>
    ));
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt="Service Image" src={row.imageUrl || ''} />
            {getDisplayValue(row.name)}
          </Box>
        </TableCell>

        <TableCell>{getDisplayValue(row.price)}</TableCell>
        <TableCell>{getDisplayValue(row.description)}</TableCell>
        <TableCell>{getDisplayValue(row.salonId)}</TableCell>

        <TableCell>{getServiceStyles()}</TableCell>

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
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onEditService(row);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              onDeleteService(row.id);
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
