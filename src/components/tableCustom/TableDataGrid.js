import React from 'react';
import {
  useNavigate
} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import styles from './tableCustom.module.css';

const TableDataGrid = ({ checkbox, tableColumns, tableRows, rowsPerPageOptions, baseRoute }) => {

  const navigate = useNavigate();

  const handelClick = (id) => {
    navigate(`${baseRoute}/${id}`);
  }

  return (
    <div className={styles.dataGridContainer} style={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={rowsPerPageOptions}
        rowsPerPageOptions={[rowsPerPageOptions]}
        checkboxSelection={checkbox}
        disableSelectionOnClick
        onRowClick={(e) => handelClick(e.id)}
        sx={{
          borderRadius: '10px',
          border: 'none',
          '& .MuiDataGrid-row': { cursor: 'pointer' },
          '& .MuiDataGrid-row:hover': { background: '#eff2f5' },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': { padding: '0 1rem' }
        }}
      />
    </div>
  )
}

export default TableDataGrid
