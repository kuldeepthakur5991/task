import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
         const token = localStorage.getItem("token");
        if (!token) {
          setMessage("You need to log in to view tasks.");
          return;
        }
        const response = await axios.get('http://localhost:5501/api/task/');
        setTasks(response.data); // Load tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setMessage(error.response?.data?.message || 'Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (taskId) => {
    navigate(`/EditTask/${taskId}`); // Navigate to edit page
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5501/api/task/${taskId}`);
      if (response.status === 200 || response.status === 204) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        setMessage('Task deleted successfully!');
      } else {
        setMessage(response.data.message || 'Failed to delete task.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred while deleting task.');
    }
  };


  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" marginBottom={3}>
        View Tasks
      </Typography>
      {message && (
        <Typography variant="h6" align="center" color="error" marginBottom={2}>
          {message}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Priority</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell> 
                    <Button
            variant="contained"
            size="small"
            sx={{ marginRight: 1 }}
            color={
              task.status === 'completed'
                ? 'success'
                : task.status === 'in-progress'
                ? 'warning'
                : 'error'
            } 
          >
            {task.status === 'completed'
              ? 'Completed'
              : task.status === 'in-progress'
              ? 'In Progress'
              : 'Pending'}
          </Button>
          </TableCell> {/* Default status is displayed */}
                  <TableCell>{task.priority}</TableCell> {/* Display Priority */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleEdit(task._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewTasks;
