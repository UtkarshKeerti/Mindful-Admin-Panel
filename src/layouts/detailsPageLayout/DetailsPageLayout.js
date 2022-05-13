import { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';

import styles from './detailsPageLayout.module.css'

const DetailsPageLayout = () => {

  const param = useParams();
  // If Param exists, then fetch details and fill the fields.
  // else Add new event page.

  const [value, setValue] = useState({
    name: "",
    description: "",
    conversation: "",
    speakers: [],
    dateTime: ""
  })
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const [speakers, setSpeakers] = useState([]);
  const handleSpeakerChange = (event) => {
    const {
      target: { value },
    } = event;
    setSpeakers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
  ]

  return (
    <Box className={styles.pageWrapper}>
      {/* <h3 className={styles.pageHeading}>Event Name</h3> */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} className={styles.imageContainer}>
          <img src="https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFubmVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
          <p className={styles.eventDateTime}>{value.dateTime}</p>
        </Grid>
        <Grid item xs={12} sm={7} className={styles.detailsContainer}>
          <Box component={'form'} className={styles.formContainer} >
            <TextField
              required
              fullWidth
              label="Event Name"
              name="name"
              value={value.name}
              onChange={handleChange}
              className={styles.formInput}
            />
            <TextField
              required
              fullWidth
              label="Description"
              name="description"
              multiline
              maxRows={5}
              value={value.description}
              onChange={handleChange}
              className={styles.formInput}
            />
            <FormControl fullWidth sx={{ mb: '1rem' }} required>
              <InputLabel id="select-convo" >Conversations</InputLabel>
              <Select
                value={value.conversation}
                onChange={handleChange}
                label="Conversations"
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
            <FormControl fullWidth sx={{ mb: '1rem' }} required>
              <InputLabel id="demo-multiple-checkbox-label">Speakers</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={speakers}
                name="speakers"
                onChange={handleSpeakerChange}
                input={<OutlinedInput label="Speakers" />}
                renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
              >
                {
                  speakersList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={speakers.indexOf(name) > -1} />
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
              value={value.dateTime}
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
