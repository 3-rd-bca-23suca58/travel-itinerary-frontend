import React, { useEffect, useState } from "react";
import {
  getItineraries,
  addItinerary,
  deleteItinerary,
  updateItinerary
} from "../services/itineraryService";

function Itinerary() {
  const [list, setList] = useState([]);
  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getItineraries()
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  };

  const addData = () => {
    if (!destination.trim()) return;

    addItinerary({ name: destination })
      .then(() => {
        setDestination("");
        loadData();
      })
      .catch(err => console.log(err));
  };

  const deleteData = async (id) => {
    try {
      const userConfirmed = await new Promise((resolve) => {
        const confirmation = window.confirm("Are you sure you want to delete this itinerary?");
        console.log("User confirmed:", confirmation);
        resolve(confirmation);
      });

      if (userConfirmed) {
        console.log("Deleting itinerary with ID:", id);
        await deleteItinerary(id);
        loadData();
      } else {
        console.log("User canceled deletion.");
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  const editData = (item) => {
    setDestination(item.destination);
    setEditId(item.id);
  };

  const saveData = () => {
    if (!destination) return;

    if (editId) {
      updateItinerary(editId, { destination })
        .then(() => {
          setEditId(null);
          setDestination("");
          loadData();
        })
        .catch(err => console.log(err));
    } else {
      addItinerary({ destination })
        .then(() => {
          setDestination("");
          loadData();
        })
        .catch(err => console.log(err));
    }
  };

  const countRecords = () => {
    alert(`Total number of records: ${list.length}`);
  };

  // ✅ SAFE filter (fixes your issue)
  const filteredList = list.filter(item =>
    (item.destination || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>✈️ Travel Itinerary</h2>

      {/* Add/Edit destination */}
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
        onClick={saveData}
        disabled={!destination}
        style={{
          padding: "8px 12px",
          backgroundColor: editId ? "#FFA500" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {editId ? "Update" : "Add"}
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

      {/* Count Button */}
      <button
        onClick={countRecords}
        style={{
          padding: "8px 12px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        Show Total Count
      </button>

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
              <span>📍 {item.destination || "No destination provided"}</span>
              <div>
                <button
                  onClick={() => editData(item)}
                  style={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px"
                  }}
                >
                  Edit
                </button>
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
              </div>
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center", padding: "10px" }}>
            No matching destinations found
          </li>
        )}
      </ul>
    </div>
  );
}

export default Itinerary;