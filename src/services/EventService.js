import axios from 'axios';


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