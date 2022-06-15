import { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Box,
  Skeleton,
  TextField,
} from '@mui/material';
import moment from 'moment';
// Service
import { getMesssages } from '../../services/MessageService';
// style
import styles from './detailsPageLayout.module.css';

const MessageDetailsLayout = () => {
  const param = useParams();

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  useEffect(() => {
    param.id &&
      getMesssages(param.id)
        .then(res => {
          if (!res) return console.log("Undefined response while getting message details!")
          setFormData({
            date: moment(res.createdAt).format('MMMM Do YYYY, h:mm:ss a [UTC]Z'),
            name: res.name,
            email: res.email,
            subject: res.subject,
            message: res.message
          })
        })
  }, [param.id])

  return (
    <Box className={styles.pageWrapper}>
      <Box className={'pageheading'}>
        {
          formData ?
            <h2>{formData.subject}</h2>
            : <Skeleton animation="wave" variant="text" width={'40%'} height={55} />
        }
      </Box>
      {
        formData &&
        <Box className={styles.formContainer} sx={{ maxWidth: '800px' }}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            value={formData.date}
            className={styles.formInput}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            className={styles.formInput}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            className={styles.formInput}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            className={styles.formInput}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            minRows={5}
            maxRows={10}
            value={formData.message}
            className={styles.formInput}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
      }
    </Box>
  )
}

export default MessageDetailsLayout
