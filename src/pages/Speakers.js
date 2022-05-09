import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableDataGrid from '../components/tableCustom/TableDataGrid';

const Speakers = () => {

  const [membersColumns, setMembersColumns] = useState([]);
  const [membersRows, setMembersRows] = useState([]);

  useEffect(() => {

    setMembersColumns([
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
    ]);

    setMembersRows([
      {
        id: 1,
        name: "Roger William Connah",
        title: "Director+Curator, Conversations and Publications",
        image: ""
      },
      {
        id: 2,
        name: "Stephen Fai",
        title: "Director, Research Initiatives",
        image: ""
      },
      {
        id: 3,
        name: "Kurt Espersen-Peters",
        title: "Co-Director, Academic Initiatives",
        image: ""
      },
      {
        id: 4,
        name: "Pallavi Swaranjali",
        title: "Co-Director, Academic Initiatives",
        image: ""
      },
      {
        id: 5,
        name: "Katie Graham",
        title: "Digital Initiatives Advisor",
        image: ""
      }
    ])
  }, [])

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Speakers</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <TableDataGrid
        tableColumns={membersColumns}
        tableRows={membersRows}
        rowsPerPageOptions={15}
      />
    </>
  )
}

export default Speakers
