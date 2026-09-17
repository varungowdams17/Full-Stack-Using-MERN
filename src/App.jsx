import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import AddTaskPage from "./components/AddTaskPage";
import TaskDetails from "./components/Taskdetails";
import TasksPage from "./tasks";
function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await fetch("/api/tasks");
                if (!response.ok) {
                    throw new Error("Unable to load tasks.");
                }
                setTasks(await response.json());
            } catch (requestError) {
                setError(requestError.message);
            } finally {
                setLoading(false);
            }
        }

        loadTasks();
    }, []);

    async function toggleTask(id) {
        const response = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
        if (!response.ok) {
            setError("Unable to update the task.");
            return;
        }
        const updatedTask = await response.json();
        setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? updatedTask : task));
    }

    async function addTask(newTask) {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            setError("Unable to add the task.");
            return;
        }
        const createdTask = await response.json();
        setTasks((currentTasks) => [...currentTasks, createdTask]);
    }

    async function removeTask(taskId) {
        const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
        if (!response.ok) {
            setError("Unable to delete the task.");
            return;
        }
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Welcome />

            {loading && <p className="request-message">Loading tasks...</p>}
            {error && <p className="request-message error">{error}</p>}

            <Routes>
                <Route
                    path="/"
                    element={<Dashboard tasks={tasks} onToggle={toggleTask} onDelete={removeTask} onAddTask={addTask} />}
                />
                <Route
                    path="/dashboard"
                    element={<Dashboard tasks={tasks} onToggle={toggleTask} onDelete={removeTask} onAddTask={addTask} />}
                />
                <Route
                    path="/tasks"
                    element={<TasksPage tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />}
                />
                <Route
                    path="/tasks/:taskId"
                    element={<TaskDetails tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />}
                />
                <Route
                    path="/add-task"
                    element={<AddTaskPage onAddTask={addTask} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;