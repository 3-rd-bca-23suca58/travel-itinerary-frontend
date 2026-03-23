import React, { useEffect, useState } from "react";
import {
  getItineraries,
  addItinerary,
  deleteItinerary
} from "../services/itineraryService";

function Itinerary() {
  const [list, setList] = useState([]);
  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState(""); // search state

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

  // ✅ Delete with confirmation
  const deleteData = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
      deleteItinerary(id).then(loadData);
    }
  };

  // ✅ Filter logic
  const filteredList = list.filter(item =>
    item.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "10px" }}>
      <h2>Travel Itinerary</h2>

      {/* Add destination */}
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={addData} disabled={!destination}>
        Add
      </button>

      {/* Search */}
      <br /><br />
      <input
        type="text"
        placeholder="Search destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Count */}
      <p>Total: {filteredList.length}</p>

      {/* List */}
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map(item => (
            <li key={item.id}>
              📍 {item.destination}
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No matching destinations found</p>
        )}
      </ul>
    </div>
  );
}

export default Itinerary;