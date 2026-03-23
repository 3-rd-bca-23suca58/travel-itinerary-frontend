import React, { useEffect, useState } from "react";
import {
  getItineraries,
  addItinerary,
  deleteItinerary
} from "../services/itineraryService";

function Itinerary() {
  const [list, setList] = useState([]);
  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState("");

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
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
      deleteItinerary(id).then(loadData);
    }
  };

  const filteredList = list.filter(item =>
    item.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>✈️ Travel Itinerary</h2>

      {/* Add destination */}
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{
          padding: "8px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <button
        onClick={addData}
        disabled={!destination}
        style={{
          padding: "8px 12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add
      </button>

      {/* Search */}
      <br /><br />
      <input
        type="text"
        placeholder="🔍 Search destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {/* Count */}
      <p style={{ marginTop: "10px" }}>
        Total: <b>{filteredList.length}</b>
      </p>

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredList.length > 0 ? (
          filteredList.map(item => (
            <li
              key={item.id}
              style={{
                background: "#f9f9f9",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>📍 {item.destination}</span>
              <button
                onClick={() => deleteData(item.id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
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