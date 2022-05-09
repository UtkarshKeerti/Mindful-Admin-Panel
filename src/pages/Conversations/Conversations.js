import { useState, useEffect } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageLayout from '../../layouts/pageLayout/PageLayout';

const Conversations = () => {

  const [conversationsCard, setConversationsCard] = useState([])
  useEffect(() => {
    setConversationsCard([
      {
        id: 111,
        heading: 'Design & Culture',
        body: 'Design & culture description',
        image: ''
      },
      {
        id: 112,
        heading: 'Canada Celebrates foDDDDBCFRTG ais dox',
        body: 'Canada Celebrates folklore decription aso c,,a..sdio calks',
        image: ''
      },
      {
        id: 113,
        heading: 'Design & Culture',
        body: 'Design & culture description',
        image: ''
      },
      {
        id: 114,
        heading: 'Canada Celebrates folklore asnico ais dox',
        body: 'Canada Celebrates folklore decravsf asjn ca osidj oic aoisd iption aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
        image: ''
      },
      {
        id: 115,
        heading: 'Design & Culture',
        body: 'Design & culture description',
        image: ''
      },

    ])
  }, [])

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Conversations</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <PageLayout
        pageData={conversationsCard}
        baseRoute={'/dashboard'}
      />
    </>
  )
}

export default Conversations
