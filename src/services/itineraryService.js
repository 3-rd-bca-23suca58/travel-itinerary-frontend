export const updateItinerary = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
