// src/pages/CafesPage.jsx

import React, { useState } from 'react';
import { Container, Button, TextField, Stack } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCafes, deleteCafe } from '../api/api';
import ConfirmDialog from '../components/ConfirmDialog';
import CustomLink from '../components/CustomLink';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CafesPage = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);

  const { data: cafes, isLoading, error } = useQuery(['cafes', filter], () => fetchCafes(filter), {
    keepPreviousData: true,
  });

  const deleteMutation = useMutation((id) => deleteCafe(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafes']);
    },
  });

  const handleDelete = (id) => {
    setCafeToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(cafeToDelete);
    setConfirmOpen(false);
    setCafeToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setCafeToDelete(null);
  };

  const columns = [
    {
      headerName: 'Logo',
      field: 'logo',
      cellRendererFramework: (params) => (
        <img src={params.value} alt="Logo" style={{ width: '50px', height: '50px' }} />
      ),
    },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Employees', field: 'employees', sortable: true, filter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <Stack direction="row" spacing={1}>
          <CustomLink variant="contained" color="primary" to={`/cafes/edit/${params.data.id}`}>
          Edit
        </CustomLink>
        <CustomLink variant="contained" color="error" onClick={() => handleDelete(params.data.id)}>
        Delete
        </CustomLink>
        </Stack>
      ),
    },
  ];

  if (isLoading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p>Error loading cafes</p></Container>;

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <TextField
          label="Filter by Location"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        />
        <CustomLink variant="contained" color="primary" to="/cafes/add">
        Add New Café
        </CustomLink>
      </Stack>
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact rowData={cafes} columnDefs={columns} pagination={true} paginationPageSize={10} />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Confirmation"
        content="Are you sure you want to delete this café?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </Container>
  );
};

export default CafesPage;
