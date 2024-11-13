import type { UserProps } from 'src/model/response/User';
import type { UserCreateProps, UserUpdateProps } from 'src/model/request/User';

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

import userApi from '../../../api/userApi';
import { UserDialog } from '../UserDialog';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export function UserMangerView() {
  const table = useTable();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const userToEdit: UserUpdateProps = {
    phone: currentUser?.phone ?? null,
    fullName: currentUser?.fullName ?? null,
    dateOfBirth: currentUser?.dateOfBirth ?? null,
    gender: currentUser?.gender ?? null,
    address: currentUser?.address ?? null,
    role: currentUser?.roleName ?? null,
    isStylist: true,
    isVerified: currentUser?.isVerified ?? null,
    status: currentUser?.status ?? null,
    salonId: currentUser?.salonId ?? null,
    imageUrl: currentUser?.imageUrl ?? null,
    commission: currentUser?.commission ?? null,
    salary: currentUser?.salary ?? null,
    salaryPerDay: currentUser?.salaryPerDay ?? null,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch both stylists and customers simultaneously
      const [stylistsResponse, customersResponse] = await Promise.all([
        userApi.getStylists(),
        userApi.getCustomers(),
      ]);

      // Merge the data from both responses
      const combinedUsers = [...stylistsResponse.data, ...customersResponse.data];

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditUser = (user: UserProps) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setOpenAddUserDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddUserDialog(false);
    setTimeout(() => {
      setIsEditMode(false);
      setCurrentUser(null);
    }, 200);
  };

  const handleSaveUser = async (user: UserCreateProps | UserUpdateProps) => {
    try {
      if (isEditMode && currentUser) {
        // Cast `user` as UserUpdateProps when updating
        const updateUserPayload: UserUpdateProps = {
          ...user,
          role: (user as UserUpdateProps).role || '',
          isStylist: (user as UserUpdateProps).isStylist ?? false,
        };
        await userApi.updateUser(currentUser.id, updateUserPayload);
      } else {
        // Cast `user` as UserCreateProps when creating
        const createUserPayload: UserCreateProps = {
          ...user,
          password: (user as UserCreateProps).password || '',
        };
        await userApi.addStylist(createUserPayload);
      }
      handleCloseDialog();
      fetchData();
    } catch (error) {
      console.error('Error saving user:', error);
      // Add error handling here, e.g., showing an error message
    }
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
                      { id: 'isVerified', label: 'Verified', align: 'center' },
                      { id: 'status', label: 'Status' },
                      { id: 'salonId', label: 'SalonId' },
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
                          row={user}
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
