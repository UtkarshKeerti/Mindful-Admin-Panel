import { useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../components/tableCustom/TableDataGrid';

const UserMessages = () => {
  const [tableHeading, setTableHeading] = useState([
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300
    },
    {
      field: 'message',
      headerName: 'Messages',
      width: 400
    }
  ])
  const [membersData, setMembersData] = useState([
    {
      id: '',
      name: "Stephen Fai",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      name: "Roger William Connah",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      name: "Katie Graham",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      name: "Kurt Espersen-Peters",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      name: "Pallavi Swaranjali",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
  ]);

  return (
    <>
      <Box className={'pageheading'}>
        <h2>User Messages</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <TableDataGrid
        tableRows={membersData}
        tableColumns={tableHeading}
        rowsPerPageOptions={15}
      />
    </>
  )
}

export default UserMessages
