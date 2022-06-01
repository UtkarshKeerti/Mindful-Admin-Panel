import { useState } from 'react';
import {
  Box,
  Button,
  Skeleton
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TableDataGrid from '../../components/tableCustom/TableDataGrid';
// import TableCustom from '../../components/tableCustom/TableCustom';
import DialogCustom from '../../components/dialogCustom/DialogCustom';
// Service
import { deleteEvent } from '../../services/EventService';

const EventsLayout = ({ eventsRow }) => {

  const [selectedRows, setSelectedRows] = useState([])
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

  // const eventsRow = [
  //   {
  //     id: 1,
  //     name: "Event - 001",
  //     description: "Event 001 description",
  //     dateTime: "12-03-2022 | 3:00pm PST"
  //   },
  //   {
  //     id: 6,
  //     name: "Event - 002",
  //     description: "Event 002 description",
  //     dateTime: "21-04-2022 | 4:30pm PST"
  //   },
  // ]

  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    if (selectedRows.length === 0) return alert('Select at least one row to proceed!')
    setOpen(true)
  }

  const handleDelete = () => {
    deleteEvent(selectedRows)
      .then(res => {
        if (!res) return console.log('Undefined value while deleting event(s)')
        setOpen(false)
        navigate(0)
        alert('Event(s) Deleted!');
      })
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/event')}
          sx={{ m: '0 1rem 1rem 0' }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={handleDeleteClick}
          sx={{ m: '0 1rem 1rem 0' }}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ height: 400 }}>
        {
          eventsRow ?
            <TableDataGrid
              tableColumns={eventsColumn}
              tableRows={eventsRow}
              checkbox
              baseRoute={'/dashboard/event'}
              setSelectedRows={setSelectedRows}
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
      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={"This action will delete all the selected events forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default EventsLayout
