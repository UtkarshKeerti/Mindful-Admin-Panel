import axios from 'axios';

// Post Conversation
export const addConversation = async (data) => {
  let response;

  await axios.post(`/conversation`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in posting conversation', err))

  return response;
}

// Get Conversaionts
export const getConversations = async (id) => {
  let response;
  let convoId = id ? `?id=${id}` : '';

  await axios.get(`/conversation/${convoId}`)
    .then(res => {
      response = res.data
      if (!id)
        sessionStorage.setItem('conversations', JSON.stringify(res.data));
    })
    .catch(err => console.log('Error in Getting Conversation/s', err))
  return response
}

// Update conversation
export const updateConversation = async (id, data) => {
  let response;

  await axios.put(`/conversation/?id=${id}`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in posting conversation', err))

  return response;
}

// Delete Conversations
export const deleteConversation = async (id) => {
  let response;

  await axios.delete(`/conversation/?id=${id}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in deleting conversation', err))

  return response;
}