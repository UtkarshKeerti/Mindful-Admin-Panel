import { useState } from 'react';
import {
  LinearProgress,
  Avatar
} from '@mui/material'
import placeholderImage from '../../assets/images/placeholder.png'
// Styles
import styles from './imageComponent.module.css'

const ImageComponent = ({
  inputId,
  formImage,
  setImageUpload,
  progressShow,
  progress,
  isProfile
}) => {

  const [imageBlob, setImageBlob] = useState(); // blobUrl for image preview

  // Function to set-up image upload
  const handleImgUpload = (e) => {
    const file = e.target.files[0]
    const blobUrl = URL.createObjectURL(file)
    setImageBlob(blobUrl) // preview
    setImageUpload(file) // for firebase file
  }

  return (
    <label htmlFor={inputId} className={styles.imageLabel} style={isProfile && { boxShadow: 'none' }}>
      <input
        id={inputId}
        type="file"
        className={styles.imageInput}
        onChange={handleImgUpload}
      />
      {
        isProfile ?
          <Avatar
            src={
              imageBlob ? imageBlob
                : formImage ? formImage
                  : ""
            }
            sx={{ width: 200, height: 200, margin: { md: '0', xs: "auto" } }}
          />
          : <img
            src={
              imageBlob ? imageBlob
                : formImage ? formImage
                  : placeholderImage
            }
            alt="uploaded-img"
          />
      }
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
  )
}

export default ImageComponent
