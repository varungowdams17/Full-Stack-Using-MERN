import AddTask from "./AddTask";

function AddTaskPage({ onAddTask }) {
    return (
        <main className="add-task-page">
            <section className="page-panel">
                <div className="page-heading">
                    <h1>Add a New Task</h1>
                    <p>Create a task for your student planning board.</p>
                </div>

                <AddTask onAddTask={onAddTask} />
            </section>
        </main>
    );
}

export default AddTaskPage;
