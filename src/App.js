import { useEffect, useState } from "react";
import {
  getDestinations,
  addDestination,
  deleteDestination,
  updateDestination
} from "./api/api";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getDestinations();
    setDestinations(res.data);
  };

  const save = async () => {
    if (editId) {
      await updateDestination(editId, { name });
      setEditId(null);
    } else {
      await addDestination({ name });
    }
    setName("");
    loadData();
  };

  const edit = (destination) => {
    setEditId(destination.id);
    setName(destination.name);
  };

  const remove = async (id) => {
    await deleteDestination(id);
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
      <button onClick={save}>
        {editId ? "Update" : "Add"}
      </button>

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
