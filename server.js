const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');
require('dotenv').config();

const app = express();

// ✅ CORS fix
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://bus-ticketing-website-front-end.vercel.app"
  ]
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running 🚀');
});

app.get('/test', (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// Register route
app.post("/register", async (req, res) => {
  console.log("Request received at register", req.body);
  try {
    const user = await User.create(req.body);
    console.log('User created:', user.toJSON());
    res.json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Connect to DB
sequelize.authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch(err => console.error('❌ DB Error:', err));

// Start server only locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
