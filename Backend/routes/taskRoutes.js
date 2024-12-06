const express = require('express');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controller/taskController');
// const requireSignIn = require('../middleware/authMidlleWare')

const router = express.Router();

// Task Routes
router.post('/create-task',createTask);       // Create a new task
router.get('/', getTasks);                    // Get all tasks
router.get('/:id', getTask);                  // Get a task by ID
router.put('/:id', updateTask);               // Update a task by ID
router.delete('/:id', deleteTask);            // Delete a task by ID

module.exports = router;
