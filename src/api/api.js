import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

export const getItineraries = () =>
  API.get("/api/itineraries");

export const addItinerary = (data) =>
  API.post("/api/itineraries", data);

export const updateItinerary = (id, data) =>
  API.put(`/api/itineraries/${id}`, data);

export const deleteItinerary = (id) =>
  API.delete(`/api/itineraries/${id}`);
