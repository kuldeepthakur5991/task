import React, { useState } from "react";
import {
  Card, CardContent, TextField, Button, Typography, Box,}from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // To redirect after login success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5501/api/auth/login",
        formData
      );

      if (response.data.success) {
        // Save token to localStorage
        // localStorage.setItem("token", response.data.token);

        setMessage("Login successful!");
        setTimeout(() => navigate("/Task"), 1500); // Redirect to dashboard after successful login
      } else {
        setMessage(response.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
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
            <Typography variant="h5" align="center" marginBottom={2}>
              Login Here
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
            </form>
            {message && (
              <Typography
                sx={{
                  marginTop: 2,
                  textAlign: "center",
                  color: message.includes("successful") ? "green" : "red",
                }}
              >
                {message}
              </Typography>
            )}
            <Typography sx={{ mt: "10px", fontWeight: "bold" }}>
              Not Registered?{" "}
              <span>
                <Link to="/">Click here</Link>
              </span>{" "}
              for Registration
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
