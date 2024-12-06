import React, { useState } from 'react'
import { Card, CardContent, TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // To redirect after login success
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5501/api/auth/register', formData
      );

      if (response.data.success) {
        setMessage('Registration successful! Please login.');
        setTimeout(() => {
          // Redirect to the login page after successful registration
          navigate("/login");
        }, 2000);
      } else {
        setMessage(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant='h3' >Task Management</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Card sx={{ maxWidth: 400, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" align="center" marginBottom={2}>
              Register Here
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Register
              </Button>
            </form>
            <Typography sx={{ mt: '10px', fontWeight: 'bold' }} >Already Registered? <span><Link to='/Login' >Login here</Link></span></Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Register