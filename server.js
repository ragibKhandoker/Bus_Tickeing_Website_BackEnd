// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const TestTable = require('./models/TestTable');
const User = require('./models/User');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running 🚀');
});
app.get('/test',(req,res)=>{
    res.json({message:"Backend connected successfully!"});
})


// Regsiter
app.post("/register",async (req,res)=>{
    console.log("Request received at register");
    console.log("Form data:",req.body);
    try {
        const user = await User.create(req.body);
    console.log('User created:', user.toJSON());
        res.json({message:"User registered successfully!", user});
    }
    catch(err){
    console.error('Error creating user:', err);
        res.status(500).json({error:err.message});
    }
});

// Connect to DB and create table
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected!');
    return sequelize.sync({ alter: true }); // apply non-destructive schema changes
  })
  .then(() => console.log('✅ Database synced!'))
  .catch(err => console.error('❌ DB Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
