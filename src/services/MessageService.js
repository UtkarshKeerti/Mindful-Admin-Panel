import axios from 'axios';

// Get Messages
export const getMesssages = async (id) => {
  const msgId = id ? `?id=${id}` : '';
  let response;

  await axios.get(`/contactus/${msgId}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error while getting messages!', err))

  return response
}

// Delete Message(s)
export const deleteMessage = async (arrayOfIds) => {
  const idsInUrl = arrayOfIds.join(',');
  let response;

  await axios.delete(`/contactus/?id=${idsInUrl}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error while deleting messages!', err))

  return response;
}