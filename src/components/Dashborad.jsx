import Statcard from "./Statcard";
import Taskcard from "./Taskcard";

function Dashboard() {
    const tasks = [{
        title: "learn React",
        description: "Learn React from scratch",
        status: "completed"
    },
    {
        title: "learn javascript",
        description: "Learn javascript from scratch",
        status: "pending"
    },
    {
        title: "learn MongoDB",
        description: "Learn MongoDB from scratch",
        status: "in progress"
    }
    ];

    return (
        <main>
            <div className="stat-container">
                <Statcard title={"Total Tasks"} value={"15"} />
                <Statcard title={"Completed"} value={"8"} />
                <Statcard title={"Pending"} value={"7"} />
            </div>

            <h2>Recent tasks</h2>

            <div className="task-container">
                {tasks.map(task => (
                    <Taskcard
                        title={task.title}
                        description={task.description}
                        status={task.status}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;
