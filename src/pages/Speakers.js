import { useEffect, useState } from 'react';
import TableDatGrid from '../components/tableCustom/TableDatGrid';

const Speakers = () => {

  const [membersColumns, setMembersColumns] = useState([]);
  const [membersRows, setMembersRows] = useState([])

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
      <h2 className={'pageheading'}>Speakers</h2>
      <TableDatGrid
        tableColumns={membersColumns}
        tableRows={membersRows}
        rowsPerPageOptions={15}
      />
    </>
  )
}

export default Speakers
