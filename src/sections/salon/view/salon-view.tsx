import type { SalonViewProps } from 'src/model/response/salon';
import type { SalonCreateProps, SalonUpdateProps } from 'src/model/request/salon';

import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { SalonViewProps } from 'src/model/response/salon';

import { SalonCreateProps, SalonUpdateProps } from 'src/model/request/salon';
import salonApi from '../../../api/salonApi';
import { uploadImage } from '../../../api/apis';
import { SalonDialog } from '../SalonDialog';
import { TableNoData } from '../table-no-data';
import { SalonTableRow } from '../salon-table-row';
import { SalonTableHead } from '../salon-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { SalonTableToolbar } from '../salon-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export function SalonView() {
  const table = useTable();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSalon, setCurrentSalon] = useState<SalonViewProps | null>(null);
  const [filterName, setFilterName] = useState('');
  const [salons, setSalons] = useState<SalonViewProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddSalonDialog, setOpenAddSalonDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const salonToEdit: SalonUpdateProps = {
    id: currentSalon?.id ?? 0,
    address: currentSalon?.address ?? null,
    phone: currentSalon?.phone ?? null,
    district: currentSalon?.district ?? null,
    imageUrl: currentSalon?.imageUrl ?? null,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await salonApi.getSalons();
      setSalons(response.data);
    } catch (error) {
      console.error('Error fetching salon:', error);
    }
    setLoading(false);
  };

  const handleEditSalon = (salon: SalonViewProps) => {
    setCurrentSalon(salon);
    setIsEditMode(true);
    setOpenAddSalonDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddSalonDialog(false);
    setIsEditMode(false);
    setCurrentSalon(null);
    setImageFile(null);
  };

  const handleSaveSalon = async (salon: SalonCreateProps | SalonUpdateProps) => {
    try {
      let ImageUrl = salon.imageUrl;
      if (imageFile) {
        ImageUrl = await uploadImage(imageFile);
      }
      if (isEditMode && currentSalon) {
        await salonApi.updateSalon({ ...salon, id: currentSalon.id, imageUrl: ImageUrl });
      } else {
        const salonSavePayload: SalonCreateProps = {
          address: salon.address,
          phone: salon.phone,
          district: salon.district,
          imageUrl: ImageUrl,
        };
        await salonApi.addSalon(salonSavePayload);
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      console.error('Error saving user:', error);
      // Add error handling here, e.g., showing an error message
    }
  };

  const handleDeleteSelected = () => {
    // Implement deletion logic for selected salons
  };

  const handleDeleteSalon = async (salonId: number) => {
    await salonApi.deleteSalon(salonId);
    fetchData();
  };

  const dataFiltered: SalonViewProps[] = applyFilter({
    inputData: salons,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Salons
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenAddSalonDialog(true)}
        >
          New salon
        </Button>
      </Box>

      <SalonDialog
        open={openAddSalonDialog}
        onClose={() => handleCloseDialog()}
        isEditMode={isEditMode}
        salon={salonToEdit}
        onSave={handleSaveSalon}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />

      <Card>
        <SalonTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
          onDeleteSelected={handleDeleteSelected} // Add this line
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <SalonTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={salons.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        salons.map((salon) => salon.id.toString())
                      )
                    }
                    headLabel={[
                      { id: 'address', label: 'Address' },
                      { id: 'phone', label: 'Phone' },
                      { id: 'district', label: 'District' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((salon) => (
                        <SalonTableRow
                          key={salon.id}
                          row={salon}
                          selected={table.selected.includes(salon.id.toString())}
                          onSelectRow={() => table.onSelectRow(salon.id.toString())}
                          onEditSalon={handleEditSalon}
                          onDeleteSalon={handleDeleteSalon}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(table.page, table.rowsPerPage, salons.length)}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              count={salons.length}
              page={table.page}
              onPageChange={table.onChangePage}
              rowsPerPage={table.rowsPerPage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Card>
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
