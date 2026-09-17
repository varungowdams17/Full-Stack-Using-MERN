import { Link } from "react-router-dom";

function TaskCard(props) {
    return (
        <div className="task-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Status: {props.status}</p>
            <div className="task-card-actions">
                <Link className="details-link" to={`/tasks/${props.id}`}>View details</Link>
                <button onClick={props.onToggle}>Change Status</button>
                <button onClick={props.onDelete}>Delete Task</button>
            </div>
        </div>
    );
}

export default TaskCard;