import axios from 'axios';
import { deleteImageFromBucket } from './FirebaseService';

// Add speaker
export const addSpeaker = async (data) => {
  let response;

  await axios.post(`/speaker`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in adding members', err))

  return response;
}

// Get all the speakers
export const getSpeakers = async (id) => {
  let response;
  const spkId = id ? `?id=${id}` : ''

  await axios.get(`/speaker/${spkId}`)
    .then(res => {
      response = res.data
      if (!id) {
        sessionStorage.setItem('speakers', JSON.stringify(res.data));
      }
    })
    .catch(err => console.log('Error in getting Speakers!', err))

  return response
}

// Update speaker
export const updateSpeaker = async (id, data) => {
  let response;

  await axios.put(`/speaker/?id=${id}`, data)
    .then((res) => response = res.data)
    .catch(err => console.log('Error in updating speakers details!', err))

  return response;
}

// Delete Speakers
export const deleteSpeaker = async (arrayOfIds) => {
  const idsInUrl = arrayOfIds.join(',');
  let response;

  // get image urls for every speaker
  getSpeakerImage(arrayOfIds)
    .then(res => {
      res.forEach((url) => {
        url.image &&
          deleteImageFromBucket(url.image)
      })
    })

  await axios.delete(`/speaker/?id=${idsInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in deleting speaker', err))

  return response;
}

// Get speaker image
export const getSpeakerImage = async (arrayOfIds) => {
  const idsInUrl = arrayOfIds.join(',');
  let response;

  await axios.get(`/speaker-image/?id=${idsInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in getting speaker images', err))

  return response;
}