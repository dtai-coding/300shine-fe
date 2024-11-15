import type { ServiceViewProps } from 'src/model/response/service';
import type { ServiceActionProps } from 'src/model/request/service';
import type { SalonNameProps } from 'src/model/response/salon';

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

import { TableNoData } from 'src/sections/manager-service/table-no-data';

import { ServiceDialog } from 'src/sections/manager-service/service-dialog';
import { TableEmptyRows } from 'src/sections/manager-service/table-empty-rows';
import { ServiceTableRow } from 'src/sections/manager-service/service-table-row';
import { ServiceTableHead } from 'src/sections/manager-service/service-table-head';
import { ServiceTableToolbar } from 'src/sections/manager-service/service-table-toolbar';
import styleApi from '../../../api/styleApi';
import salonApi from '../../../api/salonApi';
import { uploadImage } from '../../../api/apis';
import serviceApi from '../../../api/serviceApi';
import { emptyRows, applyFilter, getComparator } from '../utils';

interface Style {
  id: number;
  style: string;
}

interface Salon {
  id: number;
  address: string;
}

export function ServiceMangerView() {
  const table = useTable();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceViewProps | null>(null);
  const [filterName, setFilterName] = useState('');
  const [services, setServices] = useState<ServiceViewProps[]>([]);
  const [salons, setSalons] = useState<SalonNameProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddServiceDialog, setOpenAddServiceDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [availableStyles, setAvailableStyles] = useState<{ styleId: number; styleName: string }[]>(
    []
  );
  const [availableSalon, setAavailableSalon] = useState<{ salonId: number; salonName: string }[]>(
    []
  );

  const serviceToEdit: ServiceActionProps = {
    id: currentService?.id ?? undefined,
    imageUrl: currentService?.imageUrl ?? '',
    price: currentService?.price ?? 0,
    name: currentService?.name ?? '',
    description: currentService?.description ?? '',
    salonId: currentService?.salonId ?? 0,
    duration: 0,
    isDeleted: currentService?.isDeleted ?? false,
    serviceStyles: currentService?.serviceStyles ?? [{ styleId: undefined }],
  };

  useEffect(() => {
    fetchSalon();
    fetchStyles();
    fetchData();
  }, []);

  const fetchStyles = async () => {
    try {
      const response = await styleApi.getStyle();
      const styles = response.data.map((style: Style) => ({
        styleId: style.id,
        styleName: style.style,
      }));
      setAvailableStyles(styles);
    } catch (error) {
      console.error('Error fetching styles:', error);
    }
  };

  const fetchSalon = async () => {
    setLoading(true);
    try {
      const response = await salonApi.getSalons();
      setSalons(response.data);
      const salonsDropBox = response.data.map((salon: Salon) => ({
        salonId: salon.id,
        salonName: salon.address,
      }));
      setAavailableSalon(salonsDropBox);
    } catch (error) {
      console.error('Error fetching salon:', error);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await serviceApi.getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
    setLoading(false);
  };

  const handleEditService = (service: ServiceViewProps) => {
    setCurrentService(service);
    setIsEditMode(true);
    setOpenAddServiceDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddServiceDialog(false);
    setIsEditMode(false);
    setCurrentService(null);
    setImageFile(null);
  };

  const getSalonName = (salonId: number) => {
    const salon = salons.find((s) => s.id === salonId);
    return salon ? salon.address || 'Unnamed Salon' : 'Unknown Salon';
  };

  const handleSaveService = async (service: ServiceActionProps) => {
    try {
      let ImageUrl = service.imageUrl;
      if (imageFile) {
        ImageUrl = await uploadImage(imageFile);
      }
      if (isEditMode && currentService) {
        await serviceApi.updateServices({ ...service, id: currentService.id, imageUrl: ImageUrl });
      } else {
        const serviceSavePayload: ServiceActionProps = { ...service };
        await serviceApi.createServices(serviceSavePayload);
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      console.error('Error saving user:', error);
      // Add error handling here, e.g., showing an error message
    }
  };

  const handleDeleteSelected = () => {
    // Implement deletion logic for selected services
  };

  const handleDeleteService = async (serviceId: number) => {
    await serviceApi.deleteServices(serviceId);
    fetchData();
  };

  const dataFiltered: ServiceViewProps[] = applyFilter({
    inputData: services,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Services
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenAddServiceDialog(true)}
        >
          New service
        </Button>
      </Box>

      <ServiceDialog
        open={openAddServiceDialog}
        onClose={() => handleCloseDialog()}
        isEditMode={isEditMode}
        service={serviceToEdit}
        onSave={handleSaveService}
        imageFile={imageFile}
        setImageFile={setImageFile}
        availableStyles={availableStyles}
        availableSalons={availableSalon}
      />

      <Card>
        <ServiceTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
          onDeleteSelected={handleDeleteSelected}
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
                  <ServiceTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={services.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        services.map((service) => service.id.toString())
                      )
                    }
                    headLabel={[
                      { id: 'name', label: 'Service Name' },
                      { id: 'price', label: 'Price' },
                      { id: 'description', label: 'Description' },
                      { id: 'salonId', label: 'Salon' },
                      { id: 'styles', label: 'Styles' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((service) => (
                        <ServiceTableRow
                          key={service.id}
                          row={{
                            ...service,
                            salonName: getSalonName(service.salonId),
                          }}
                          selected={table.selected.includes(service.id.toString())}
                          onSelectRow={() => table.onSelectRow(service.id.toString())}
                          onEditService={handleEditService}
                          onDeleteService={handleDeleteService}
                          availableStyles={availableStyles}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(table.page, table.rowsPerPage, services.length)}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              count={services.length}
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
