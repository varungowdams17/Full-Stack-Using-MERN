import { useState } from "react";
import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Learn React", description: "To be finished in 5 days", status: "pending" },
        { id: 2, title: "Learn MERN", description: "To be finished in 9 days", status: "pending" },
        { id: 3, title: "Learn MongoDB", description: "To be finished in 3 days", status: "pending" },
    ]);

    function toggleTask(id) {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
                    : task
            )
        );
    }

    function addTask(newTask) {
        const nextId = Math.max(...tasks.map((task) => task.id)) + 1;

        setTasks([
            ...tasks,
            {
                id: nextId,
                title: newTask.title,
                description: newTask.description,
                status: "pending",
            },
        ]);
    }

    return (
        <main id="dashboard">
            <div className="stack-container">
                <StatCard title="Total Tasks" value={tasks.length} />
                <StatCard
                    title="Completed"
                    value={tasks.filter((t) => t.status === "completed").length}
                />
                <StatCard
                    title="Pending"
                    value={tasks.filter((t) => t.status === "pending").length}
                />
            </div>

            <AddTask onAddTask={addTask} />

            <h2>Recent Tasks</h2>

            <div className="task-container" id="tasks">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task.id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;