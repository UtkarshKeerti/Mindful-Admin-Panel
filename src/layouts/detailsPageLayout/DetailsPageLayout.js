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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import ImageComponent from '../../components/imageComponent/ImageComponent';

import SaveIcon from '@mui/icons-material/Save';
// Service
import { getEvents, updateEvent, postEvent } from '../../services/EventService';
import { uploadImageToBucket } from '../../services/FirebaseService';

import styles from './detailsPageLayout.module.css';

const DetailsPageLayout = () => {

  const navigate = useNavigate();
  const param = useParams();
  // If Param exists, then fetch details and fill the fields.
  // else Add new event page.

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const conversations = sessionStorage.getItem('conversations') ? JSON.parse(sessionStorage.getItem('conversations')) : []
  const speakersList = sessionStorage.getItem('speakers') ? JSON.parse(sessionStorage.getItem('speakers')) : []

  // Function to display speaker names from Id when selected from dropdown.
  const renderSpeaker = (selected) => {
    // 'selected' is an array
    let tempSpeaker = [];
    speakersList.forEach((spk) => {
      selected.forEach((selSpk) => {
        if (selSpk === spk._id) tempSpeaker.push(spk.name);
      })
    });

    // Separated by commas
    return tempSpeaker.join(', ');
  }

  const [imageUpload, setImageUpload] = useState(); // file for firebase image upload
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    conversation: "",
    speakers: [],
    date: "",
    time: ""
  });

  useEffect(() => {
    param.id &&
      // Get Event Details by Id
      getEvents(param.id)
        .then((res) => {
          if (!res) return console.log('Undefined Response for Event Details!')
          setFormData(res);
        })
  }, [param.id])

  const handleChange = (e) => {
    if (e.target.name === "speakers") {
      const {
        target: { value },
      } = e;
      setFormData({
        ...formData,
        speakers: typeof value === 'string' ? value.split(',') : value,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  // Function to handle update or post event api calls
  const eventApiRequest = (reqBody) => {
    // console.log('FORMM', reqBody);

    param.id ?
      // Update event
      updateEvent(param.id, reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while updating event!')
          setLoading(false);
          alert(res.message)
        })
      // Posting Event
      : postEvent(reqBody)
        .then(res => {
          if (!res) return console.log('Undefined response while posting event!');
          setLoading(false);
          alert(res.message)
          navigate(-1)
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
        'events',
        eventApiRequest,
        setProgress,
        setProgressShow,
        formData,
        setLoading
      )
    }
    else
      eventApiRequest(formData);
  }


  return (
    <Box className={styles.pageWrapper}>
      <Box className={'pageheading'}>
        {
          formData ?
            <h2>{formData.name}</h2>
            : <Skeleton animation="wave" variant="text" width={'40%'} height={55} />
        }
        {
          loading ?
            <CircularProgress size={30} sx={{ marginRight: 3 }} /> :
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={
                !(formData.name && formData.conversation)
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
          <p className={styles.eventDateTime}>{`${formData.date} || ${formData.time}`}</p>
        </Grid>
        <Grid item xs={12} sm={7} className={styles.detailsContainer}>
          <Box component={'form'} onSubmit={handleSubmit} className={styles.formContainer}>
            <TextField
              required
              fullWidth
              label="Event Name"
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
            <FormControl fullWidth sx={{ mb: '1rem' }} required>
              <InputLabel id="select-convo">Conversation</InputLabel>
              <Select
                value={formData.conversation}
                onChange={handleChange}
                label="Conversation"
                labelId="select-convo"
                name="conversation"
              >
                {
                  conversations.map((convo, i) =>
                    <MenuItem
                      key={convo._id}
                      value={convo._id}
                    >
                      {convo.name}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: '1rem' }}>
              <InputLabel id="demo-multiple-checkbox-label">Speaker</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={formData.speakers}
                name="speakers"
                onChange={handleChange}
                input={<OutlinedInput label="Speakers" />}
                renderValue={(selected) => renderSpeaker(selected)}
                MenuProps={MenuProps}
              >
                {
                  speakersList.map((spk, i) => (
                    <MenuItem key={spk._id} value={spk._id}>
                      <Checkbox checked={formData.speakers.indexOf(spk._id) > -1} />
                      <ListItemText primary={spk.name} />
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.formInput}
            />
            <TextField
              fullWidth
              label="Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={styles.formInput}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DetailsPageLayout
