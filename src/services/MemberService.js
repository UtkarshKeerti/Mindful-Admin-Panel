import axios from 'axios';

// Add member
export const addMember = async (data) => {
  let response;

  await axios.post(`/member`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error in adding members', err))

  return response;
}

// Get all Members or a member details by Id
export const getMember = async (id) => {
  const memberId = id ? `?id=${id}` : '';
  let response;

  await axios.get(`/member/${memberId}`)
    .then(res => response = res.data)
    .catch(err => console.log('Error in getting members', err))

  return response;
}

// Update member
export const updateMember = async (id, data) => {
  let response;

  await axios.put(`/member/?id=${id}`, data)
    .then((res) => response = res.data)
    .catch(err => console.log('Error in updating member details!', err))

  return response;
}


// Delete Member
