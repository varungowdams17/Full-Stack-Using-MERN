require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const Task = require("./models/Task");

dns.setServers(["8.8.8.8"]);

const app = express();

const normalizeStatus = (status) => {
    const value = String(status ?? "Pending").trim().toLowerCase();
    return value === "completed" ? "Completed" : "Pending";
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Back-end server is running");
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB Atlas");

        try {
            await Task.collection.dropIndex("id_1").catch(() => {});
            await Task.collection.updateMany({ id: { $exists: true } }, { $unset: { id: "" } });
            console.log("Task collection cleaned up for MongoDB Atlas");
        } catch (error) {
            console.error("Task collection cleanup warning:", error.message);
        }
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error.message);
    });

app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error reading tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error reading task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            status: normalizeStatus(req.body?.status),
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.patch("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        const currentStatus = String(task.status ?? "Pending").trim().toLowerCase();
        const nextStatus = normalizeStatus(
            req.body?.status ?? (currentStatus === "completed" ? "Pending" : "Completed")
        );

        task.status = nextStatus;
        await task.save();
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const payload = {
            ...req.body,
            status: normalizeStatus(req.body?.status),
        };

        const task = await Task.findByIdAndUpdate(req.params.id, payload, { new: true });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(5050, () => {
    console.log("Server is running on port 5050");
});