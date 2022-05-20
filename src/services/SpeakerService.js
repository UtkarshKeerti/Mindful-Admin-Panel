import axios from 'axios';

// Get all the speakers
export const getSpeakers = async () => {
  let response;

  await axios.get('/speaker')
    .then(res => response = res.data)
    .catch(err => console.log('Error in getting Speakers!', err))

  return response
}