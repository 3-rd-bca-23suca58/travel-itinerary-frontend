import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"  // Backend port
});

export const getItineraries = () =>
  API.get("/api/destinations");

export const addItinerary = (data) =>
  API.post("/api/destinations", data);

export const updateItinerary = (id, data) =>
  API.put(`/api/destinations/${id}`, data);

export const deleteItinerary = (id) =>
  API.delete(`/api/destinations/${id}`);
