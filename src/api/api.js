import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getDestinations = () =>
  API.get("/destinations");

export const addDestination = (destination) =>
  API.post("/destinations", destination);

export const updateDestination = (id, destination) =>
  API.put(`/destinations/${id}`, destination);

export const deleteDestination = (id) =>
  API.delete(`/destinations/${id}`);
