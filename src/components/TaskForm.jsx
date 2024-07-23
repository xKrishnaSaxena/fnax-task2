import React, { useState, useEffect, useContext } from "react";
import "./TasksForm.css";
import { useUser } from "../contexts/UserContext";
import Header from "./Header";
import { AuthenticationContext } from "../contexts/AuthContext";

const TasksForm = () => {
  const { user } = useUser();

  const { token } = useContext(AuthenticationContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [editingTask, setEditingTask] = useState(null);
  const BASEURL = "https://fnax-task2-backend.onrender.com";

  useEffect(() => {
    fetch(`${BASEURL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate,
      status,
      createdBy: user.username,
    };

    const requestOptions = {
      method: editingTask ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    };

    const url = editingTask
      ? `${BASEURL}/api/tasks/${editingTask._id}`
      : `${BASEURL}/api/tasks`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (editingTask) {
          setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
        } else {
          setTasks([...tasks, data]);
        }
        resetForm();
      })
      .catch((error) => console.error("Error saving task:", error));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
  };

  const handleDelete = (id) => {
    fetch(`${BASEURL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
    <>
      <Header />
      <div className="tasks-container">
        {user ? (
          <>
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
              <input
                type="text"
                value={user.username}
                readOnly
                className="tasks-input"
              />
              <button type="submit" className="tasks-submit-button">
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </form>
          </>
        ) : (
          <>Login to do CRUD on Tasks</>
        )}

        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task._id} className="tasks-list-item">
              <h2 className="tasks-title">{task.title}</h2>
              <p className="tasks-description">{task.description}</p>
              <p className="tasks-due-date">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="tasks-status">Status: {task.status}</p>
              <p className="tasks-status">Created By: {task.createdBy}</p>
              {user ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TasksForm;
