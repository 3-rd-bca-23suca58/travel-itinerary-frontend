import { useEffect, useState } from "react";
import { getItineraries, addItinerary, updateItinerary, deleteItinerary } from "./api/api";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getItineraries();
      setDestinations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const save = async () => {
    if (!name) return;
    if (editId) {
      await updateItinerary(editId, { name });
      setEditId(null);
    } else {
      await addItinerary({ name });
    }
    setName("");
    loadData();
  };

  const edit = (d) => {
    setEditId(d.id);
    setName(d.name);
  };

  const remove = async (id) => {
    await deleteItinerary(id);
    loadData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Travel Itinerary</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Destination"
      />
      <button onClick={save}>{editId ? "Update" : "Add"}</button>
      <ul>
        {destinations.map((d) => (
          <li key={d.id}>
            {d.name}
            <button onClick={() => edit(d)}>Edit</button>
            <button onClick={() => remove(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
