import axios from 'axios';

// Add publication
export const addPublication = async (data) => {
  let response;

  await axios.post(`/publication`, data)
    .then(res => response = res.data)
    .catch(err => console.log('Error while adding publications', err))

  return response
}

// Get publication
export const getPublication = async (id) => {
  const pubId = id ? `?id=${id}` : '';
  let response;

  await axios.get(`/publication/${pubId}`)
    .then(res => response = res.data)
    .catch(err => console.log("Error in getting publications", err))

  return response;
}

// Update Publication
export const updatePublication = async (id, data) => {
  let response;

  await axios.put(`/publication/?id=${id}`, data)
    .then(res => response = res.data)
    .catch(err => console.log("Error in updating publication", err))

  return response
}

// Delete publication
export const deletePublication = async (id) => {
  let response;

  await axios.delete(`/publication/?id=${id}`)
    .then(res => response = res.data)
    .catch(err => console.log("Error in deleting publication", err))

  return response
}