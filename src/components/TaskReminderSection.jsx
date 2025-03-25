import React, { useState, useEffect } from "react";
import { FaCheck, FaClock, FaExclamationTriangle, FaTrash, FaPlus } from "react-icons/fa";

const TaskReminderSection = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const queryParams = new URLSearchParams({ status: filter, sortBy });
      try {
        const response = await fetch(`http://localhost:5000/api/tasks?${queryParams}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [filter, sortBy]);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, priority, due_date: dueDate }),
      });
      const task = await response.json();
      setTasks((prevTasks) => [task, ...prevTasks]);
      setNewTask("");
      setPriority("low");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Mark task as completed
  const handleVerifyTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/verify`, {
        method: "PUT",
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: "completed" } : task
        )
      );
    } catch (error) {
      console.error("Error verifying task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Task Reminders</h2>

      {/* Add Task Form */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaPlus />
        </button>
      </div>

      {/* Filters and Sorting */}
      <div className="flex items-center space-x-4 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at">Date Created</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {task.status === "completed" && <FaCheck className="text-green-500" />}
                {task.status === "pending" && <FaClock className="text-blue-500" />}
                {task.status === "overdue" && <FaExclamationTriangle className="text-red-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-500">
                  Priority: <span className="capitalize">{task.priority}</span> | Due:{" "}
                  {task.due_date ? task.due_date : "No Due Date"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {task.status === "pending" && (
                <button
                  onClick={() => handleVerifyTask(task.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition"
                >
                  Verify
                </button>
              )}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskReminderSection;
