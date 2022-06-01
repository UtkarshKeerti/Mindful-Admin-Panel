import axios from 'axios';


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
  let response;

  const idInUrl = arrayOfIds.join(',')

  await axios.delete(`/speaker/?id=${idInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in deleting speaker', err))

  return response;
}
