import axios from 'axios';

export const getConversations = async (id) => {
  let response;
  let convoId = id ? `?id=${id}` : '';

  await axios.get(`/conversation/${convoId}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in Getting Conversation/s', err))
  return response
}