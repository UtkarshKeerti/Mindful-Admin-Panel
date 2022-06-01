import { useState, useEffect } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageLayout from '../../layouts/pageLayout/PageLayout';
// Services
import { getConversations } from '../../services/ConversationService';

const Conversations = () => {

  // const conversationsCard = [
  //   {
  //     id: 111,
  //     name: 'Design & Culture',
  //     body: 'Design & culture description',
  //     image: ''
  //   },
  //   {
  //     id: 112,
  //     name: 'Canada Celebrates foDDDDBCFRTG ais dox',
  //     body: 'Canada Celebrates folklore decription aso c,,a..sdio calks',
  //     image: ''
  //   },
  //   {
  //     id: 113,
  //     name: 'Design & Culture',
  //     body: 'Design & culture description',
  //     image: ''
  //   },
  //   {
  //     id: 114,
  //     name: 'Canada Celebrates folklore asnico ais dox',
  //     body: 'Canada Celebrates folklore decravsf asjn ca osidj oic aoisd iption aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
  //     image: ''
  //   },
  //   {
  //     id: 115,
  //     name: 'Design & Culture',
  //     body: 'Design & culture description',
  //     image: ''
  //   },
  // ]
  const [conversationsCard, setConversationsCard] = useState()

  useEffect(() => {
    // !sessionStorage.getItem('conversations') ?
    // Get Conversation API Call
    getConversations()
      .then((res) => {
        if (!res) return console.log('Undefined response for Conversations!')
        setConversationsCard(res)
        sessionStorage.setItem('conversations', JSON.stringify(res));
      })
    // : setConversationsCard(JSON.parse(sessionStorage.getItem('conversations')))

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
        deleteDialogDesc={"This will delete the selected conversation along with all the Events under it forever. Do you still want to continue?"}
      />
    </>
  )
}

export default Conversations
