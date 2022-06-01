import { useState } from 'react';
import {
  useNavigate
} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import styles from './tableCustom.module.css';

const TableDataGrid = ({ checkbox, tableColumns, tableRows, rowsPerPageOptions, baseRoute, setSelectedRows }) => {

  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10)

  const handelClick = (id) => {
    if (!baseRoute) return
    navigate(`${baseRoute}/${id}`);
  }

  return (
    <div className={styles.dataGridContainer} style={{ width: '100%' }}>
      <DataGrid
        loading={!tableRows && !tableColumns}
        rows={tableRows}
        columns={tableColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50, 100]}
        checkboxSelection={checkbox}
        onSelectionModelChange={(row) => setSelectedRows(row)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        onRowClick={(e) => handelClick(e.id)}
        autoHeight
        sx={{
          borderRadius: '8px',
          background: '#fff',
          border: 'none',
          '& .MuiDataGrid-row': { cursor: 'pointer' },
          '& .MuiDataGrid-row:hover': { background: '#eff2f5' },
        }}
      />
    </div>
  )
}

export default TableDataGrid
