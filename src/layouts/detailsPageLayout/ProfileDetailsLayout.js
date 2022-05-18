import { useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  TextField,
  Avatar
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import styles from './detailsPageLayout.module.css';


const ProfileDetailsLayout = () => {

  const param = useParams();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    about: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data', formData)
  }

  return (
    <Box className={styles.pageWrapper}>
      <Box className={'pageheading'}>
        <h2 className={styles.pageHeading}>
          {
            param.id ? `Name ${param.id}` : "Add New Profile"
          }
        </h2>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={!formData.name}
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ maxWidth: { md: '250px', xs: '100%' } }}
          className={styles.profileImageContainer}
        >
          <Avatar
            src={formData.image}
            sx={{ width: 200, height: 200, margin: { md: '0', xs: "auto" } }}
          />
        </Grid>
        <Grid item xs={12} md={7} className={styles.detailsContainer}>
          <Box component={'form'} className={styles.formContainer}>
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
              label="Title"
              name="title"
              multiline
              maxRows={8}
              value={formData.title}
              onChange={handleChange}
              className={styles.formInput}
            />
            <TextField
              fullWidth
              label="About"
              name="about"
              multiline
              maxRows={8}
              value={formData.about}
              onChange={handleChange}
              className={styles.formInput}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileDetailsLayout
