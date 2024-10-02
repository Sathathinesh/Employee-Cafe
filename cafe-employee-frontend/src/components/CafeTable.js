import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CafeTable = ({ cafes, onEdit, onDelete }) => {
  const columns = [
    { headerName: 'Logo', field: 'logo', cellRenderer: 'logoRenderer' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Employees', field: 'employees' },
    { headerName: 'Location', field: 'location' },
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

  const frameworkComponents = {
    logoRenderer: params => <img src={params.value} alt="logo" style={{ width: 50, height: 50 }} />,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={cafes}
        columnDefs={columns}
        frameworkComponents={frameworkComponents}
      />
    </div>
  );
};

export default CafeTable;
