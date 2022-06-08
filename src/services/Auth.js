import axios from 'axios';

export const adminLogin = async (data) => {
  let response;

  await axios.post(`/admin-login`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error signing in', err))

  return response;
}