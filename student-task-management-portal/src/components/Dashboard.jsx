import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard({ tasks, onToggle, onDelete, onAddTask }) {
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

            <AddTask onAddTask={onAddTask} />

            <h2>Recent Tasks</h2>

            <div className="task-container" id="tasks">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => onToggle(task.id)}
                        onDelete={() => onDelete(task.id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;