import { useState, useEffect } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import PageLayout from '../../layouts/pageLayout/PageLayout';
import DialogCustom from '../../components/dialogCustom/DialogCustom';
// Services
import { getConversations, deleteConversation } from '../../services/ConversationService';

const Conversations = () => {

  const navigate = useNavigate();

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
  const [conversationsCard, setConversationsCard] = useState();

  // Get Conversation API Call
  const getConvoApiCall = () => {
    setConversationsCard()
    getConversations()
      .then((res) => {
        if (!res) return console.log('Undefined response for Conversations!')
        setConversationsCard(res)
      })
  }

  useEffect(() => {
    getConvoApiCall()
  }, [])

  const [selectedConvo, setSelectedConvo] = useState('');
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteConversation(selectedConvo)
      .then(res => {
        if (!res) return console.log('Undefined response while deleting conversation!')
        setOpen(false);
        getConvoApiCall()
        alert('Conversation deleted successfully!');
      })
  }

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Conversations</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/add-convo')}
        >
          Add
        </Button>
      </Box>
      <PageLayout
        pageData={conversationsCard}
        baseRoute={'/dashboard'}
        setSelectedCard={setSelectedConvo}
        setOpen={setOpen}
      />

      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={"This will delete the selected conversation along with all the Events under it forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default Conversations
