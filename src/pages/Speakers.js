import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom';
import TableDataGrid from '../components/tableCustom/TableDataGrid';
import DialogCustom from '../components/dialogCustom/DialogCustom';
// Icon
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// Services
import { getSpeakers, deleteSpeaker } from '../services/SpeakerService';

const Speakers = () => {

  const navigate = useNavigate();

  const membersColumns = [
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
      field: 'about',
      headerName: 'About',
      width: 500,
    }
  ];

  const [membersRow, setMembersRow] = useState([])

  const getSpeakerApiCall = () => {
    getSpeakers()
      .then(res => {
        if (!res) return console.log("undefined response while getting speakers")

        let tempArray = [];
        res.forEach((speaker) => {
          const spk = {
            id: speaker._id,
            name: speaker.name,
            about: speaker.about
          }
          tempArray.push(spk)
        });
        setMembersRow(tempArray)
      })
  }

  useEffect(() => {
    getSpeakerApiCall()
  }, [])

  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])

  const handleDeleteClick = () => {
    if (selectedRows.length === 0) return alert("Select at least on row to continue!")
    setOpen(true)
  }

  const handleDelete = () => {
    deleteSpeaker(selectedRows)
      .then(res => {
        if (!res) return console.log("Undefined response while deleting speaker!")
        setOpen(false)
        getSpeakerApiCall()
        alert('Speaker(s) Deleted!')
      })
  }

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Speakers</h2>
        <Box>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: '1rem' }}
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/speaker')}
          >
            Add
          </Button>
        </Box>
      </Box>
      <TableDataGrid
        tableColumns={membersColumns}
        tableRows={membersRow}
        rowsPerPageOptions={15}
        checkbox
        baseRoute={'/dashboard/speaker'}
        setSelectedRows={setSelectedRows}
      />

      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={"This action will delete all the selected speakers forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default Speakers
