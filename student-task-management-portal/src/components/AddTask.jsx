import { useState } from "react";

function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleAddTask() {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) {
            return;
        }

        onAddTask({
            title: trimmedTitle,
            description: trimmedDescription,
        });

        setTitle("");
        setDescription("");
    }

    return (
        <section className="add-task">
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task title"
            />

            <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Task description"
            />

            <button onClick={handleAddTask}>
                Add Task
            </button>
        </section>
    );
}

export default AddTask;