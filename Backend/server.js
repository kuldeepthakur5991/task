const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoutes')

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);   // For authentication
app.use('/api/task', taskRoutes);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
