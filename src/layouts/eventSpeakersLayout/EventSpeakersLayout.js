import React from 'react';
import {
  Box,
  Skeleton
  // Button
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../../components/tableCustom/TableDataGrid';

const EventSpeakersLayout = ({ speakersRow }) => {
  const speakersColumn = [
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

  // const speakersRow = [
  //   {
  //     id: 1,
  //     name: "Speaker - 001",
  //     description: "Speaker 001 description",
  //   },
  //   {
  //     id: 2,
  //     name: "Speaker - 002",
  //     description: "Speaker 002 description",
  //   },
  //   {
  //     id: 3,
  //     name: "Speaker - 003",
  //     description: "Speaker 003 description",
  //   },
  // ]

  return (
    <>
      <Box className={'pageheading'}>
        {/* <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button> */}
      </Box>
      <Box sx={{ height: 400 }}>
        {
          speakersRow ?
            <TableDataGrid
              tableColumns={speakersColumn}
              tableRows={speakersRow}
              rowsPerPageOptions={15}
              baseRoute={'/dashboard/speaker'}
            />
            // <TableCustom 
            //   tableColumnData={eventsColumn}
            //   tableRowData={eventsRow}
            // />
            :
            <Skeleton
              animation='wave'
              variant="rectangular"
              height={'100%'}
              sx={{ borderRadius: '10px' }}
            />
        }
      </Box>
    </>
  )
}

export default EventSpeakersLayout
