import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import {
  Grid,
  Box,
  Skeleton,
  CircularProgress,
  Button,
  TextField,
  Avatar,
  LinearProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
// Service
import { getSpeakers, addSpeaker, updateSpeaker } from '../../services/SpeakerService';
import { getMember, addMember, updateMember } from '../../services/MemberService';
import { uploadImageToBucket } from '../../services/FirebaseService';
// style
import styles from './detailsPageLayout.module.css';


const ProfileDetailsLayout = ({ layout }) => {

  const navigate = useNavigate();
  const param = useParams();

  const [imageUpload, setImageUpload] = useState(); // file for firebase image upload
  const [imageBlob, setImageBlob] = useState();   // BlobUrl for image preview.
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    about: "",
    image: ""
  });

  useEffect(() => {

    if (param.id) {
      layout === 'speaker' ?
        // Get speaker details
        getSpeakers(param.id)
          .then((res) => {
            if (!res) return console.log("Undefined response - get Speaker Details");
            setFormData({
              name: res.name,
              about: res.about,
              image: res.image
            })
          }) :
        // Get Member Details
        getMember(param.id)
          .then((res) => {
            if (!res) return console.log('Undefined response - get Member details');
            setFormData({
              name: res.name,
              about: res.about,
              title: res.title,
              image: res.image
            })
          })
    }

  }, [param.id, layout])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    setImageBlob(blobUrl) // image preview
    setImageUpload(file) // firbase image upload
  }

  // To handle post/update API calls
  const profileApiRequest = (reqBody) => {
    // console.log("REQBODY: ", reqBody)

    if (!param.id) {
      layout === 'member' ?
        // Add member
        addMember(reqBody)
          .then((res) => {
            if (!res) return console.log('Could not add member!');
            alert(res.message);
            setLoading(false);
            navigate(-1);
          }) :
        // Add speaker
        addSpeaker(reqBody)
          .then((res) => {
            if (!res) return console.log('Could not add Speaker!');
            alert(res.message);
            setLoading(false);
            navigate(-1)
          })
    } else {
      layout === 'member' ?
        // update member
        updateMember(param.id, reqBody)
          .then((res) => {
            if (!res) return console.log('Could not update member');
            alert(res.message)
            setLoading(false);
          }) :
        // Update Speaker
        updateSpeaker(param.id, reqBody)
          .then((res) => {
            if (!res) return console.log('Could not update speaker');
            alert(res.message)
            setLoading(false);
          })
    }
  }

  const [progressShow, setpProgressShow] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    if (imageUpload) {
      uploadImageToBucket(
        imageUpload,
        'profiles',
        profileApiRequest,
        setProgress,
        setpProgressShow,
        formData
      )
    } else
      profileApiRequest(formData);
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
              disabled={!(formData && formData.name)}
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
        }
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ maxWidth: { md: '250px', xs: '100%' } }}
          className={styles.profileImageContainer}
        >
          <label htmlFor="upload-profile-img" className={styles.imageLable}>
            <input
              id="upload-profile-img"
              type="file"
              className={styles.imageInput}
              onChange={handleImageUpload}
            />
            <Avatar
              src={
                imageBlob ? imageBlob
                  : formData.image ? formData.image
                    : ""
              }
              sx={{ width: 200, height: 200, margin: { md: '0', xs: "auto" } }}
            />
            {
              progressShow &&
              <span className={styles.backdropContainer}>
                <span className={styles.progressContainer}>
                  <p>{progress}%</p>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ width: '80%', m: '0 auto', borderRadius: '8px' }}
                  />
                </span>
              </span>
            }
          </label>
        </Grid>

        {
          formData &&
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
              {
                layout === 'member' &&
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
              }
              <TextField
                fullWidth
                label="About"
                name="about"
                multiline
                maxRows={10}
                value={formData.about}
                onChange={handleChange}
                className={styles.formInput}
              />
            </Box>
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default ProfileDetailsLayout
