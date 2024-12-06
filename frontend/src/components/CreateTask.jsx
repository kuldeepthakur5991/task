import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium", // Default priority
    // status: "pending", // Default status
  });
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    

      const response = await axios.post(
        "http://localhost:5501/api/task/create-task",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 204) {
        setMessage("Task created successfully!");
        setTimeout(() => navigate("/ViewTask"), 1000);
      } else {
        setMessage("Unexpected response. Task creation might have failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Task Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ maxWidth: 400, padding: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              marginBottom={2}
            >
              Create Task
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <TextField
                label="Title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              {/* Description Input */}
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
              {/* Due Date Input */}
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              {/* Priority Dropdown */}
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
              {/* Status Dropdown */}
              {/* <FormControl fullWidth margin="normal" required>
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
              </FormControl> */}
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Create
              </Button>
            </form>
            {/* Success or Error Message */}
            {message && (
              <Typography
                sx={{
                  marginTop: 2,
                  textAlign: "center",
                  color: message.includes("successfully") ? "green" : "red",
                }}
              >
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CreateTask;
