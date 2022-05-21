import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../components/tableCustom/TableDataGrid';
// import TableCustom from '../components/tableCustom/TableCustom';
// Service
import { getMember } from '../services/MemberService';

const Members = () => {

  const navigate = useNavigate();
  // const [membersData, setMembersData] = useState([])
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

  useEffect(() => {

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
  }, [])

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Members</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/member')}
        >
          Add
        </Button>
      </Box>
      {/* <TableCustom tableData={membersData} /> */}
      <TableDataGrid
        tableColumns={membersColumns}
        tableRows={membersRows}
        rowsPerPageOptions={15}
        checkbox
        baseRoute={'/dashboard/member'}
      />
    </>
  )
}

export default Members
