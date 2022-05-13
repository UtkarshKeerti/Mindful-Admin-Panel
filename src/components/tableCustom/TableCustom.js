import React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import styles from './tableCustom.module.css';


const TableCustom = ({ tableRowData, tableColumnData }) => {

  const handleRoute = () => {

  }

  return (
    <Box className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {
              tableColumnData && tableColumnData.map((col, i) =>
                <TableCell
                  key={`table-head-${i}`}
                  sx={{ width: `${col.width}px` }}
                >
                  {col.headerName}
                </TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowData && tableRowData.map((row, i) => (
            <TableRow
              key={`table-row-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={styles.tableRow}
              onClick={handleRoute}
            >
              {
                tableColumnData && tableColumnData.map((cell) =>
                  Object.keys(row).map((key, i) =>
                    key === cell.field &&
                    <TableCell
                      key={`cell-${i}`}
                      sx={{ width: `${cell.width}px` }}
                    >
                      {
                        cell.field === 'image' ?
                          <Avatar src={row[key]} />
                          : row[key]
                      }
                    </TableCell>
                  )
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default TableCustom
