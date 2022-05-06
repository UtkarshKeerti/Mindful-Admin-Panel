import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from './tableCustom.module.css';

const TableDatGrid = ({ tableColumns, tableRows, rowsPerPageOptions }) => {
  return (
    <div className={styles.dataGridContainer} style={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={rowsPerPageOptions}
        rowsPerPageOptions={[rowsPerPageOptions]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default TableDatGrid
