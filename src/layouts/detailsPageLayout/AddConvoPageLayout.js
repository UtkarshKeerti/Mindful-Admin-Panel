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
} from '@mui/material';
import ImageComponent from '../../components/imageComponent/ImageComponent';
import SaveIcon from '@mui/icons-material/Save';
// Service
import { addConversation, updateConversation } from '../../services/ConversationService';
import { addPublication, getPublication, updatePublication } from '../../services/PublicationService';
import { uploadImageToBucket } from '../../services/FirebaseService';

import styles from './detailsPageLayout.module.css';

const AddConvoPageLayout = ({ convoData, layout }) => {

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
    if (param.id) {
      convoData ?
        setFormData({
          name: convoData.name,
          image: convoData.image,
          description: convoData.description
        })
        : layout === 'publication' &&
        getPublication(param.id)
          .then(res => {
            if (!res) return console.log("Undefined response while getting publication")
            setFormData(res)
          })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // API call function for conversation
  const convoApiCall = (reqBody) => {
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

  // API call function for Publication
  const publicationApiCall = (reqBody) => {
    param.id ?
      // update publication
      updatePublication(param.id, reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while updating publication!');
          setLoading(false);
          navigate(-1)
          alert(res.message)
        })
      // Add publication
      : addPublication(reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while adding publication');
          setLoading(false)
          navigate(-1)
          alert(res.message);
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
        layout === 'publication' ? 'publications' : 'conversations',
        layout === 'publication' ? publicationApiCall : convoApiCall,
        setProgress,
        setProgressShow,
        formData,
        setLoading
      )
    } else {
      layout === 'publication' ?
        publicationApiCall(formData)
        : convoApiCall(formData)
    }
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
            inputId={'upload-img'}
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
              label="Name"
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
