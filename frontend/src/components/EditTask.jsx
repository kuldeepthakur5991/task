import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending', // Add status to the task data
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5501/api/task/${taskId}`);
        const data = response.data;
        if (data) {
          setTaskData({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            priority: data.priority,
            status: data.status, // Fetch the status from the API
          });
        } else {
          setMessage('Task not found.');
        }
      } catch (err) {
        console.error('Error fetching task:', err);
        setMessage('Error occurred while fetching task details.');
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5501/api/task/${taskId}`,
        taskData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      if (response.status === 200 && data.success) {
        setMessage('Task updated successfully!');
        setTimeout(() => {
          navigate('/ViewTask');
        }, 1500);
      } else {
        setMessage(data.message || 'Failed to update task.');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setMessage('Error occurred while updating the task.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ maxWidth: 500, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" marginBottom={2}>
            Edit Task
          </Typography>
          {message && (
            <Typography
              variant="body1"
              color={message.includes('success') ? 'green' : 'red'}
              align="center"
              marginBottom={2}
            >
              {message}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={taskData.dueDate.split('T')[0]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />

            {/* Priority Field */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            {/* Status Field */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Update Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditTask;
