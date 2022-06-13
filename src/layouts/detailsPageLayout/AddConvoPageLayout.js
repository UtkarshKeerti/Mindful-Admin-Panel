import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  Skeleton,
  CircularProgress,
  TextField,
  LinearProgress
} from '@mui/material';
import ImageComponent from '../../components/imageComponent/ImageComponent';
import SaveIcon from '@mui/icons-material/Save';
// Service
import { addConversation, updateConversation } from '../../services/ConversationService';
import { uploadImageToBucket } from '../../services/FirebaseService';

import styles from './detailsPageLayout.module.css';

const AddConvoPageLayout = ({ convoData }) => {

  const navigate = useNavigate();
  const param = useParams();

  const [imageUpload, setImageUpload] = useState(); // file for firebase image upload
  const [loading, setLoading] = useState(false)


  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    param.id && convoData &&
      setFormData({
        name: convoData.name,
        image: convoData.image,
        description: convoData.description
      })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // API calls function
  const addConvoApiCall = (reqBody) => {

    param.id ?
      // update conversation
      updateConversation(param.id, reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while updating conversation!');
          setLoading(false);
          navigate(-1)
          alert(res.message)
        })
      // Add Conversation
      : addConversation(reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while posting conversation!');
          setLoading(false);
          navigate(-1)
          alert(res.message)
        })
  }

  const [progressShow, setProgressShow] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (imageUpload) {
      uploadImageToBucket(
        imageUpload,
        'conversations',
        addConvoApiCall,
        setProgress,
        setProgressShow,
        formData,
        setLoading
      )
    } else
      addConvoApiCall(formData)
  }


  return (
    <Box className={styles.pageWrapper}>
      <Box className={'pageheading'}>
        {
          formData ?
            <h2>{formData.name}</h2>
            : <Skeleton animation="wave" variant="text" width={"40%"} height={55} />
        }
        {
          loading ?
            <CircularProgress size={30} sx={{ marginRight: 3 }} /> :
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={
                !(formData.name)
              }
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
        }
      </Box>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ maxWidth: { md: 400, xs: '100%' } }}
          className={styles.imageContainer}
        >
          <ImageComponent
            inputId={'upload-convo-img'}
            formImage={formData.image}
            setImageUpload={setImageUpload}
            progressShow={progressShow}
            progress={progress}
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.detailsContainer}>
          <Box component={'form'} onSubmit={handleSubmit} className={styles.formContainer}>
            <TextField
              required
              fullWidth
              label="Conversation Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              minRows={4}
              maxRows={8}
              value={formData.description}
              onChange={handleChange}
              className={styles.formInput}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>

  )
}

export default AddConvoPageLayout
