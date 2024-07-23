import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TasksForm.css";

const TasksForm = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingTask, setEditingTask] = useState(null);
  const BASEURL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${BASEURL}/api/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      axios
        .patch(`${BASEURL}/api/tasks/${editingTask._id}`, {
          title,
          description,
          dueDate,
          status,
        })
        .then((response) => {
          setTasks(
            tasks.map((task) =>
              task._id === response.data._id ? response.data : task
            )
          );
          resetForm();
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      axios
        .post(`${BASEURL}/api/tasks`, {
          title,
          description,
          dueDate,
          status,
        })
        .then((response) => {
          setTasks([...tasks, response.data]);
          resetForm();
        })
        .catch((error) => console.error("Error creating task:", error));
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASEURL}/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
    setEditingTask(null);
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-heading">Manage Tasks</h1>
      <form className="tasks-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="tasks-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="tasks-textarea"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="tasks-input"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="tasks-select"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="tasks-submit-button">
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </form>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task._id} className="tasks-list-item">
            <h2 className="tasks-title">{task.title}</h2>
            <p className="tasks-description">{task.description}</p>
            <p className="tasks-due-date">
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="tasks-status">Status: {task.status}</p>
            <button
              onClick={() => handleEdit(task)}
              className="tasks-edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="tasks-delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksForm;
