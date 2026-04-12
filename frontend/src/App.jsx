import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/users/${editId}`, { name, email });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/users", { name, email });
    }
    setName(""); setEmail(""); fetchUsers();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>CRUD App</h2>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br /><br />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <ul style={{ listStyle: "none" }}>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => { setName(u.name); setEmail(u.email); setEditId(u._id); }}>
              Edit
            </button>
            <button onClick={async () => {
              await axios.delete(`http://localhost:5000/users/${u._id}`);
              fetchUsers();
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;