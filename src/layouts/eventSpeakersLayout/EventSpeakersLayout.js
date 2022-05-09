import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../../components/tableCustom/TableDataGrid';

const EventSpeakersLayout = () => {
  const eventsColumn = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      sortable: false
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
    }
  ];

  const eventsRow = [
    {
      id: 1,
      name: "Speaker - 001",
      description: "Speaker 001 description",
    },
    {
      id: 2,
      name: "Speaker - 002",
      description: "Speaker 002 description",
    },
    {
      id: 3,
      name: "Speaker - 003",
      description: "Speaker 003 description",
    },
  ]

  return (
    <>
      <Box className={'pageheading'}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <TableDataGrid
        tableColumns={eventsColumn}
        tableRows={eventsRow}
        rowsPerPageOptions={15}
      />
    </>
  )
}

export default EventSpeakersLayout
