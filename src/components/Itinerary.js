import React, { useEffect, useMemo, useState } from "react";
import {
  getItineraries,
  addItinerary,
  updateItinerary,
  deleteItinerary,
} from "../api/api";

const normalize = (item) => ({
  ...item,
  id: item?.id ?? item?._id ?? item?.uuid ?? null,
  destination:
    item?.destination ?? item?.name ?? item?.location ?? item?.place ?? "",
});

const extractData = (res) => res?.data?.data ?? res?.data ?? null;

function Itinerary() {
  const [itineraries, setItineraries] = useState([]);
  const [destinationInput, setDestinationInput] = useState("");
  const [search, setSearch] = useState("");
  const [showTotal, setShowTotal] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getItineraries();
        const list = Array.isArray(res?.data) ? res.data : [];
        setItineraries(
          list.map((item, index) => {
            const n = normalize(item);
            return { ...n, id: n.id ?? `row-${index}` };
          })
        );
      } catch (err) {
        console.error("Failed to load itineraries:", err);
      }
    };
    load();
  }, []);

  const handleAdd = async () => {
    const text = destinationInput.trim();
    if (!text) return;

    const tempId = `tmp-${Date.now()}`;
    setItineraries((prev) => [...prev, { id: tempId, destination: text }]);
    setDestinationInput("");

    try {
      let res;
      try {
        res = await addItinerary({ destination: text });
      } catch {
        res = await addItinerary(text);
      }

      const createdRaw = extractData(res) || { id: tempId, destination: text };
      const created = normalize(createdRaw);

      setItineraries((prev) =>
        prev.map((it) =>
          it.id === tempId
            ? {
                ...it,
                ...created,
                id: created.id ?? tempId,
                destination: created.destination?.trim() ? created.destination : text,
              }
            : it
        )
      );
    } catch (err) {
      setItineraries((prev) => prev.filter((it) => it.id !== tempId));
      console.error("Failed to add itinerary:", err);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.destination || "");
  };

  const handleUpdate = async (id) => {
    const text = editText.trim();
    if (!text) return;

    const previous = itineraries;

    // optimistic UI update
    setItineraries((prev) =>
      prev.map((it) => (it.id === id ? { ...it, destination: text } : it))
    );
    setEditingId(null);
    setEditText("");

    try {
      let res;
      try {
        res = await updateItinerary(id, { destination: text });
      } catch {
        try {
          res = await updateItinerary(id, { name: text });
        } catch {
          try {
            res = await updateItinerary({ destination: text }, id);
          } catch {
            res = await updateItinerary(text, id);
          }
        }
      }

      const updatedRaw = extractData(res) || {};
      const updated = normalize(updatedRaw);

      setItineraries((prev) =>
        prev.map((it) =>
          it.id === id
            ? {
                ...it,
                ...updated,
                id: updated.id ?? it.id,
                // critical: do not erase with empty response value
                destination: updated.destination?.trim()
                  ? updated.destination
                  : it.destination,
              }
            : it
        )
      );
    } catch (err) {
      setItineraries(previous); // rollback on failure
      console.error("Failed to update itinerary:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItinerary(id);
      setItineraries((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      console.error("Failed to delete itinerary:", err);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return itineraries;
    return itineraries.filter((it) =>
      (it.destination || "").toLowerCase().includes(q)
    );
  }, [itineraries, search]);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>✈️ Travel Itinerary</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Enter destination"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <p>
        Total: <strong>{filtered.length}</strong>
      </p>
      <button onClick={() => setShowTotal((s) => !s)}>
        {showTotal ? "Hide Total Count" : "Show Total Count"}
      </button>
      {showTotal && <p>Total itineraries: {itineraries.length}</p>}

      <div style={{ marginTop: 16 }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginBottom: 8,
              background: "#f5f5f5",
              borderRadius: 6,
            }}
          >
            {editingId === item.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdate(item.id)}
              />
            ) : (
              <span>📍 {item.destination?.trim() || "No destination provided"}</span>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              {editingId === item.id ? (
                <button onClick={() => handleUpdate(item.id)}>Save</button>
              ) : (
                <button onClick={() => startEdit(item)}>Edit</button>
              )}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;