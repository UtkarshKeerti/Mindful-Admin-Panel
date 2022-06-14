import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import TableDataGrid from '../components/tableCustom/TableDataGrid';
import DialogCustom from '../components/dialogCustom/DialogCustom';
// Icons
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// Services
import { getMesssages, deleteMessage } from '../services/MessageService';

const UserMessages = () => {

  const tableHeading = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 280
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 300
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 400
    },
  ]

  const [messageRow, setMessageRow] = useState([])

  const getMessagesApiCall = () => {
    getMesssages()
      .then(res => {
        if (!res) return console.log("undefined response while getting messages!")

        const tempArray = []
        res.forEach((msg) => {
          const msgRow = {
            id: msg._id,
            name: msg.name,
            email: msg.email,
            subject: msg.subject,
            message: msg.message
          }
          tempArray.push(msgRow);
        })
        setMessageRow(tempArray)
      })
  }

  useEffect(() => {
    getMessagesApiCall()
  }, [])

  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])

  const handleDeleteClick = () => {
    if (selectedRows.length === 0) return alert("Select at least on row to continue!")
    setOpen(true)
  }

  const handleDelete = () => {
    deleteMessage(selectedRows)
      .then(res => {
        if (!res) return console.log("Undefined response while deleting speaker!")
        setOpen(false)
        getMessagesApiCall()
        alert(res.message)
      })
  }

  return (
    <>
      <Box className={'pageheading'}>
        <h2>User Messages</h2>
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
        </Box>
      </Box>
      <TableDataGrid
        tableRows={messageRow}
        tableColumns={tableHeading}
        rowsPerPageOptions={15}
        checkbox
        setSelectedRows={setSelectedRows}
      />

      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={"This action will delete all the selected messages forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default UserMessages
