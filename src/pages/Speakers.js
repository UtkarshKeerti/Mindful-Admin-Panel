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

  useEffect(() => {
    const speakersList = sessionStorage.getItem('speakers') && JSON.parse(sessionStorage.getItem('speakers'));
    let tempArray = [];
    speakersList.forEach((speaker) => {
      const spk = {
        id: speaker._id,
        name: speaker.name,
        about: speaker.about
      }
      tempArray.push(spk)
    });
    setMembersRow(tempArray)
  }, [])

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Speakers</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/speaker')}
        >
          Add
        </Button>
      </Box>
      <TableDataGrid
        tableColumns={membersColumns}
        tableRows={membersRow}
        rowsPerPageOptions={15}
        checkbo
        baseRoute={'/dashboard/speaker'}
      />
    </>
  )
}

export default Speakers
