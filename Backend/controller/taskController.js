const Task = require('../models/taskModel');

// Create Task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Task by ID
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Task
// Update Task
const updateTask = async (req, res) => {
    try {
        const id = req.params.id;

        // Update and return the task in one query
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        // Check if task exists
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Respond with the updated task
        res.status(200).json({
            success: true,
            message: "Task updated successfully", updatedTask
        });
    } catch (error) {
        // Handle invalid IDs or other errors
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });  // Add success: false
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });  // Add success: false
    }
};


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
