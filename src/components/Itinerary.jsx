import React, { useEffect, useState } from "react";
import {
  getItineraries,
  addItinerary,
  deleteItinerary
} from "../services/itineraryService";

function Itinerary() {
  const [list, setList] = useState([]);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getItineraries()
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  };

  const addData = () => {
    if (!destination) return;

    addItinerary({ destination })
      .then(() => {
        setDestination("");
        loadData();
      });
  };

  const deleteData = (id) => {
    deleteItinerary(id).then(loadData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Travel Itinerary</h2>

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button onClick={addData}>Add</button>

      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.destination}
            <button onClick={() => deleteData(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Itinerary;
