import type { UserProps } from 'src/model/response/User';
import type { UserActionProps } from 'src/model/request/User';
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

import styleApi from '../../../api/styleApi';
import userApi from '../../../api/userApi';
import { UserDialog } from '../UserDialog';
import salonApi from '../../../api/salonApi';
import { TableNoData } from '../table-no-data';
import { uploadImage } from '../../../api/apis';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

interface Style {
  id: number;
  style: string;
}

interface Salon {
  id: number;
  address: string;
}

export function UserView() {
  const table = useTable();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [salons, setSalons] = useState<SalonNameProps[]>([]);
  const [availableStyles, setAvailableStyles] = useState<{ styleId: number; styleName: string }[]>(
    []
  );
  const [availableSalon, setAavailableSalon] = useState<{ salonId: number; salonName: string }[]>(
    []
  );

  const ROLE_MAP = {
    Admin: 1,
    Manager: 2,
    Customer: 3,
    Stylist: 4,
  } as const;

  type RoleName = keyof typeof ROLE_MAP;

  const userToEdit: UserActionProps = {
    phone: currentUser?.phone ?? null,
    fullName: currentUser?.fullName ?? null,
    dateOfBirth: currentUser?.dateOfBirth ?? null,
    gender: currentUser?.gender ?? null,
    address: currentUser?.address ?? null,
    roleId:
      currentUser?.roleName && currentUser.roleName in ROLE_MAP
        ? ROLE_MAP[currentUser.roleName as RoleName]
        : null,
    isStylist: false,
    isVerified: currentUser?.isVerified ?? null,
    status: currentUser?.status ?? null,
    salonId: currentUser?.salonId ?? null,
    imageUrl: currentUser?.imageUrl ?? null,
    commission: currentUser?.commission ?? null,
    salary: currentUser?.salary ?? null,
    salaryPerDay: currentUser?.salaryPerDay ?? null,
  };

  useEffect(() => {
    fetchSalon();
    fetchData();
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const response = await styleApi.getStyle();
      const styles = response.data.map((style: Style) => ({
        styleId: style.id,
        styleName: style.style,
      }));
      console.log(styles);
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
      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    setLoading(false);
  };

  const handleEditUser = (user: UserProps) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setOpenAddUserDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddUserDialog(false);
    setIsEditMode(false);
    setCurrentUser(null);
    setImageFile(null);
  };

  const handleSaveUser = async (user: UserActionProps) => {
    try {
      let ImageUrl = user.imageUrl;

      if (imageFile) {
        ImageUrl = await uploadImage(imageFile);
      }

      if (isEditMode && currentUser) {
        const updateUserPayload: UserActionProps = {
          ...user,
          imageUrl: ImageUrl,
          roleId: user.roleId,
          isStylist: false,

          password: undefined,
        };
        console.log(updateUserPayload);
        await userApi.updateUser(currentUser.id, updateUserPayload);
      } else {
        const createUserPayload: UserActionProps = {
          ...user,
          imageUrl: ImageUrl,
          isStylist: undefined,
          roleId: undefined,
          status: 'Active',
          password: user.password || '',
        };
        const sanitizedPayload = Object.fromEntries(
          Object.entries(createUserPayload).filter(([_, v]) => v !== null && v !== undefined)
        ) as UserActionProps;
        console.log(sanitizedPayload);
        await userApi.addManager(sanitizedPayload);
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      console.error('Error saving user:', error);
      // Add error handling here, e.g., showing an error message
    }
  };

  const getSalonName = (salonId: number | null): string => {
    if (salonId === null) return 'No Salon';
    const salon = salons.find((s) => s.id === salonId);
    return salon && salon.address ? salon.address : 'Unknown Salon';
  };

  const handleDeleteUser = async (userId: number) => {
    await userApi.deleteUser(userId);
    fetchData();
  };

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenAddUserDialog(true)}
        >
          New user
        </Button>
      </Box>

      <UserDialog
        open={openAddUserDialog}
        onClose={() => handleCloseDialog()}
        isEditMode={isEditMode}
        user={userToEdit}
        onSave={handleSaveUser}
        imageFile={imageFile}
        setImageFile={setImageFile}
        availableStyles={availableStyles}
        availableSalons={availableSalon}
      />

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
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
                  <UserTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={users.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        users.map((user) => user.id.toString())
                      )
                    }
                    headLabel={[
                      { id: 'fullName', label: 'FullName' },
                      { id: 'dateOfBirth', label: 'DateOfBirth' },
                      { id: 'gender', label: 'Gender' },
                      { id: 'phone', label: 'Phone' },
                      { id: 'address', label: 'Address' },
                      { id: 'isVerified', label: 'Verified', align: 'center' },
                      { id: 'status', label: 'Status' },
                      { id: 'salonId', label: 'Salon' },
                      { id: 'roleName', label: 'Role' },
                      { id: 'commission', label: 'Commission' },
                      { id: 'salary', label: 'Salary' },
                      { id: 'salaryPerDay', label: 'SalaryPerDay' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((user) => (
                        <UserTableRow
                          key={user.id}
                          row={{
                            ...user,
                            salonName: getSalonName(user.salonId),
                          }}
                          selected={table.selected.includes(user.id.toString())}
                          onSelectRow={() => table.onSelectRow(user.id.toString())}
                          onEditUser={handleEditUser}
                          onDeleteUser={handleDeleteUser}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                    />

                    {notFound && <TableNoData searchQuery={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              count={users.length}
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
