import axios from 'axios';

// Get Conversaionts
export const getConversations = async (id) => {
  let response;
  let convoId = id ? `?id=${id}` : '';

  await axios.get(`/conversation/${convoId}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in Getting Conversation/s', err))
  return response
}

// Delete Conversations
export const deleteConversation = async (id) => {
  let response;

  await axios.delete(`/conversation/?id=${id}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in deleting conversation', err))

  return response;
}