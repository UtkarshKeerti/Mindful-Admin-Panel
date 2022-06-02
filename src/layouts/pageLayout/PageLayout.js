import { useState } from 'react';
import {
  useNavigate
} from 'react-router-dom'
import {
  Grid,
  Box,
  CircularProgress
} from '@mui/material';
import CardCustom from '../../components/cardCustom/CardCustom';
import DialogCustom from '../../components/dialogCustom/DialogCustom';
// Service
import { deleteConversation } from '../../services/ConversationService';

import styles from './pageLayout.module.css';

const PageLayout = ({ pageData, baseRoute, deleteDialogDesc }) => {

  const navigate = useNavigate();

  const [selectedConvo, setSelectedConvo] = useState('');
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteConversation(selectedConvo)
      .then(res => {
        if (!res) return console.log('Undefined response while deleting conversation!')

        setOpen(false);
        navigate(0)
        alert('Conversation deleted successfully!');
      })
  }

  return (
    <>
      {
        pageData ?
          pageData.length === 0 ?
            <p className={styles.noData}>No data found :(</p> :
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              {
                pageData.map((card, i) =>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    sx={{ maxWidth: { xl: "350px" } }}
                    key={i}
                  >
                    <CardCustom
                      heading={card.name}
                      body={card.about && card.about}
                      image={card.image.data}
                      cardId={card._id}
                      baseRoute={baseRoute}
                      setOpenDialog={setOpen}
                      setCardId={setSelectedConvo}
                    />
                  </Grid>
                )
              }
            </Grid> :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={50} />
          </Box>
      }
      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete Anyway"}
        description={deleteDialogDesc}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default PageLayout
