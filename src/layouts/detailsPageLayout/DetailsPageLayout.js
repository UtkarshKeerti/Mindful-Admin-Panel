import { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import styles from './detailsPageLayout.module.css'

const DetailsPageLayout = () => {

  const param = useParams();
  // If Param exists, then fetch details and fill the fields.
  // else Add new event page.

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    conversation: "",
    speakers: [],
    dateTime: ""
  })

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

  // const [speakers, setSpeakers] = useState([]);

  // const handleSpeakerChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   // setSpeakers(
  //   //   // On autofill we get a stringified value.
  //   //   typeof value === 'string' ? value.split(',') : value,
  //   // );
  //   setFormData({
  //     ...formData,
  //     speakers: typeof value === 'string' ? value.split(',') : value,
  //   })
  // };

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

  const conversations = [
    "Design and Culture",
    "Canada Celebrates Folklore",
    "Mindful Modernism"
  ]

  const speakersList = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data', formData)
  }

  return (
    <Box className={styles.pageWrapper}>
      <Box className={'pageheading'}>
        <h2 className={styles.pageHeading}>
          {
            param.id ? `Event ${param.id}` : "Add New Event"
          }
        </h2>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={
            !(formData.name && formData.conversation && formData.dateTime)
          }
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} className={styles.imageContainer}>
          <img src="https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFubmVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
          <p className={styles.eventDateTime}>{formData.dateTime}</p>
        </Grid>
        <Grid item xs={12} sm={7} className={styles.detailsContainer}>
          <Box component={'form'} className={styles.formContainer}>
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
              maxRows={5}
              value={formData.description}
              onChange={handleChange}
              className={styles.formInput}
            />
            <FormControl fullWidth sx={{ mb: '1rem' }} required>
              <InputLabel id="select-convo" >Conversation</InputLabel>
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
                      key={i}
                      value={convo}
                    >
                      {convo}
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
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {
                  speakersList.map((name, i) => (
                    <MenuItem key={i} value={name}>
                      <Checkbox checked={formData.speakers.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              label="Data & Time"
              name="dateTime"
              value={formData.dateTime}
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
