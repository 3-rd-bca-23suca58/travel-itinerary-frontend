import axios from "axios";
const API_URL = "http://localhost:8080/api/destinations";

export const getItineraries = () => axios.get(API_URL);
export const addItinerary = (data) => axios.post(API_URL, data);
export const updateItinerary = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteItinerary = (id) => axios.delete(`${API_URL}/${id}`);