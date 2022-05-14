import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../../components/tableCustom/TableDataGrid';
// import TableCustom from '../../components/tableCustom/TableCustom';

const EventsLayout = () => {

  const navigate = useNavigate();

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
    },
    {
      field: 'dateTime',
      headerName: 'Date & Time',
      width: 230,
    }
  ];

  const eventsRow = [
    {
      id: 1,
      name: "Event - 001",
      description: "Event 001 description",
      dateTime: "12-03-2022 | 3:00pm PST"
    },
    {
      id: 6,
      name: "Event - 002",
      description: "Event 002 description",
      dateTime: "21-04-2022 | 4:30pm PST"
    },
  ]

  return (
    <>
      <Box className={'pageheading'}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/event')}
        >
          Add
        </Button>
      </Box>
      <TableDataGrid
        tableColumns={eventsColumn}
        tableRows={eventsRow}
        rowsPerPageOptions={15}
        // checkbox
        baseRoute={'/dashboard/event'}
      />
      {/* <TableCustom 
        tableColumnData={eventsColumn}
        tableRowData={eventsRow}
      /> */}
    </>
  )
}

export default EventsLayout
