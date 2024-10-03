import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const columns = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email_address' },
    { headerName: 'Phone Number', field: 'phone_number' },
    { headerName: 'Days Worked', field: 'days_worked' },
    { headerName: 'Cafe', field: 'cafe' },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: params => (
        <>
          <button onClick={() => onEdit(params.value)}>Edit</button>
          <button onClick={() => onDelete(params.value)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={employees}
        columnDefs={columns}
      />
    </div>
  );
};

export default EmployeeTable;
