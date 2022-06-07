import axios from 'axios';
import { deleteImageFromBucket } from './FirebaseService';


// Post Event
export const postEvent = async (eventData) => {
  let response;
  const data = eventData

  await axios.post(`/event`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in posting events!', err))
  return response;
}

// Get event details
export const getEvents = async (id) => {
  const eventId = id ? `?id=${id}` : '';
  let response;

  await axios.get(`/event/${eventId}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in getting Events!', err))
  return response;
}

// Update Event details
export const updateEvent = async (id, eventData) => {
  let response;

  const data = eventData

  await axios.put(`/event/?id=${id}`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in updating details!', err))
  return response;
}

// Delete Events
export const deleteEvent = async (arrayOfIds) => {
  const idsInUrl = arrayOfIds.join(',');
  let response;

  // Get image urls of every events
  getEventImage(arrayOfIds)
    .then(res => {
      res.forEach((url) => {
        url.image &&
          deleteImageFromBucket(url.image)
      })
    })

  await axios.delete(`/event/?id=${idsInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in deleting Event(s)', err))

  return response
}

// Get event image
export const getEventImage = async (arrayOfIds) => {
  const idsInUrl = arrayOfIds.join(',');
  let response;

  await axios.get(`/event-image/?id=${idsInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in getting event images', err))

  return response;
}