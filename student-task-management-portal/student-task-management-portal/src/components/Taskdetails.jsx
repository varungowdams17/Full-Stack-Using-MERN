import { Link, useNavigate, useParams } from "react-router-dom";

function TaskDetails({ tasks, onToggle, onDelete }) {
	const { taskId } = useParams();
	const navigate = useNavigate();
	const task = tasks.find((item) => String(item.id) === taskId);

	if (!task) {
		return (
			<main className="task-details-page">
				<section className="task-details empty-state">
					<h1>Task not found</h1>
					<p>This task may have been deleted or is no longer available.</p>
					<Link className="back-link" to="/tasks">Back to tasks</Link>
				</section>
			</main>
		);
	}

	function handleDelete() {
		onDelete(task.id);
		navigate("/tasks");
	}

	return (
		<main className="task-details-page">
			<section className="task-details">
				<Link className="back-link" to="/tasks">&larr; Back to tasks</Link>
				<div className="task-details-header">
					<div>
						<span className={`task-status ${task.status}`}>{task.status}</span>
						<h1>{task.title}</h1>
					</div>
					<span className="task-id">Task #{task.id}</span>
				</div>

				<div className="task-details-copy">
					<span>Description</span>
					<p>{task.description}</p>
				</div>

				<div className="task-details-actions">
					<button type="button" onClick={() => onToggle(task.id)}>
						Mark as {task.status === "pending" ? "completed" : "pending"}
					</button>
					<button type="button" className="danger-button" onClick={handleDelete}>
						Delete task
					</button>
				</div>
			</section>
		</main>
	);
}

export default TaskDetails;
