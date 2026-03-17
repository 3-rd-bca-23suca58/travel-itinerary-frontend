import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-itinerary-backend-fbud.onrender.com"  // Backend port
});

export const getItineraries = () =>
  API.get("/api/destinations");

export const addItinerary = (data) =>
  API.post("/api/destinations", data);

export const updateItinerary = (id, data) =>
  API.put(`/api/destinations/${id}`, data);

export const deleteItinerary = (id) =>
  API.delete(`/api/destinations/${id}`);
