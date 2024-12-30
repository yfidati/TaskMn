import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const res = await axios.post("http://localhost:5000/api/tasks", { title: newTask, dueDate });
      setTasks([...tasks, res.data]);
      setNewTask("");
      setDueDate("");
    }
  };

  const updateTask = async () => {
    if (editingTask && newTask.trim()) {
      const res = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, { 
        title: newTask, 
        dueDate 
      });
      setTasks(tasks.map((task) => (task._id === editingTask._id ? res.data : task)));
      setEditingTask(null);
      setNewTask("");
      setDueDate("");
    }
  };

  const toggleTask = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add or update a task..."
        />
        <input
          type="datetime-local"
          className="border rounded p-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          onClick={editingTask ? updateTask : addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button
            onClick={() => {
              setEditingTask(null);
              setNewTask("");
              setDueDate("");
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between mb-2">
            <div>
              <span
                onClick={() => toggleTask(task._id, task.completed)}
                className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </span>
              <div className="text-sm text-gray-500">
                {task.dueDate ? new Date(task.dueDate).toLocaleString() : "No due date"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingTask(task);
                  setNewTask(task.title);
                  setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "");
                }}
                className="text-blue-500"
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
