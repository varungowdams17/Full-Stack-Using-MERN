import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(__dirname, "data");
const dataFile = path.join(dataDirectory, "tasks.json");
const port = process.env.PORT || 5000;

const seedTasks = [
    { id: 1, title: "Learn React", description: "To be finished in 5 days", status: "pending" },
    { id: 2, title: "Learn MERN", description: "To be finished in 9 days", status: "pending" },
    { id: 3, title: "Learn MongoDB", description: "To be finished in 3 days", status: "pending" },
];

function ensureDataFile() {
    fs.mkdirSync(dataDirectory, { recursive: true });
    if (!fs.existsSync(dataFile)) {        fs.writeFileSync(dataFile, JSON.stringify(seedTasks, null, 2));
    }
}

function readTasks() {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function writeTasks(tasks) {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
});

app.get("/api/tasks", (_request, response) => {
    response.json(readTasks());
});

app.get("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const task = readTasks().find((item) => item.id === taskId);

    if (!task) {
        return response.status(404).json({ message: "Task not found." });
    }

    return response.json(task);
});

app.post("/api/tasks", (request, response) => {
    const title = request.body?.title?.trim();
    const description = request.body?.description?.trim();

    if (!title || !description) {
        return response.status(400).json({ message: "Title and description are required." });
    }

    const tasks = readTasks();
    const task = {
        id: tasks.length ? Math.max(...tasks.map((item) => item.id)) + 1 : 1,
        title,
        description,
        status: "pending",
    };

    tasks.push(task);
    writeTasks(tasks);
    return response.status(201).json(task);
});

app.patch("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const tasks = readTasks();
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
        return response.status(404).json({ message: "Task not found." });
    }

    if (request.body?.status && !["pending", "completed"].includes(request.body.status)) {
        return response.status(400).json({ message: "Status must be pending or completed." });
    }

    task.status = request.body?.status || (task.status === "pending" ? "completed" : "pending");
    writeTasks(tasks);
    return response.json(task);
});

app.delete("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const tasks = readTasks();
    const remainingTasks = tasks.filter((item) => item.id !== taskId);

    if (remainingTasks.length === tasks.length) {
        return response.status(404).json({ message: "Task not found." });
    }

    writeTasks(remainingTasks);
    return response.status(204).send();
});

app.use((_request, response) => {
    response.status(404).json({ message: "Route not found." });
});

app.listen(port, () => {
    console.log(`Task API listening on http://localhost:${port}`);
});
