import { useState } from 'react';
import TableCustom from '../components/tableCustom/TableCustom';

const UserMessages = () => {
  const [tableHeading, setTableHeading] = useState([
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'image',
      headerName: '',
      width: 80
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
      image: '',
      name: "Stephen Fai",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      image: '',
      name: "Roger William Connah",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      image: '',
      name: "Katie Graham",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      image: '',
      name: "Kurt Espersen-Peters",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
    {
      id: '',
      image: '',
      name: "Pallavi Swaranjali",
      message: "ASmdasoc aso dasdcasdgew12ygfc",
    },
  ]);

  return (
    <>
      <h2 className={'pageheading'}>User Messages</h2>
      <TableCustom
        tableRowData={membersData}
        tableColumnData={tableHeading}
      />
    </>
  )
}

export default UserMessages
