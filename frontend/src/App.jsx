import React, { useEffect, useState } from "react";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  }

  async function createTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await fetch(
      `${API_URL}/tasks?title=${encodeURIComponent(title)}`,
      {
        method: "POST",
      }
    );

    setTitle("");
    loadTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Docker Task App</h1>

      <form onSubmit={createTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
        />

        <button type="submit">
          Add Task
        </button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: "10px" }}>
          <span>{task.title}</span>

          <button
            onClick={() => deleteTask(task.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
