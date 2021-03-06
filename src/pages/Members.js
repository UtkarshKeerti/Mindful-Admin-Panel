import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import TableDataGrid from '../components/tableCustom/TableDataGrid';
import DialogCustom from '../components/dialogCustom/DialogCustom';
// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// Service
import { getMember, deleteMember } from '../services/MemberService';

const Members = () => {

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
      field: 'title',
      headerName: 'Title',
      width: 500,
    }
  ]
  const [membersRows, setMembersRows] = useState([])

  const getMemberApiCall = () => {
    getMember()
      .then((res) => {
        if (!res) return console.log('Undefined response while getting members')

        let tempMember = [];
        res.forEach((member) => {
          const memb = {
            id: member._id,
            name: member.name,
            title: member.title,
            about: member.about,
            image: member.image
          }
          tempMember.push(memb)
        })
        setMembersRows(tempMember)
      })
  }

  useEffect(() => {
    getMemberApiCall()
  }, [])

  const [open, setOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const handleDeleteClick = () => {
    if (selectedRows.length === 0) return alert("Select at least on row to continue!")
    setOpen(true)
  }

  const handleDelete = () => {
    deleteMember(selectedRows)
      .then(res => {
        if (!res) return console.log("Undefined response while deleting speaker!")
        setOpen(false)
        // navigate(0)
        getMemberApiCall()
        alert('Member(s) Deleted!')
      })
  }

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Members</h2>
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
            onClick={() => navigate('/dashboard/member')}
          >
            Add
        </Button>
        </Box>
      </Box>
      <TableDataGrid
        tableColumns={membersColumns}
        tableRows={membersRows}
        rowsPerPageOptions={15}
        checkbox
        baseRoute={'/dashboard/member'}
        setSelectedRows={setSelectedRows}
      />

      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={"This action will delete all the selected members forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default Members
