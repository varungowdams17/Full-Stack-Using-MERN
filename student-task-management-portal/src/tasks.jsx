import TaskCard from "./components/TaskCard";

function TasksPage({ tasks, onToggle, onDelete }) {
    return (
        <main className="tasks-page">
            <section className="page-heading">
                <h1>Tasks Page</h1>
                <p>All student tasks are listed here.</p>
            </section>

            <div className="task-container">
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

export default TasksPage;