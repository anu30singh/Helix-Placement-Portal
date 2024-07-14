const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db.Connection');
const User = require('./models/User'); // Changed schema to User for clarity
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const secret = "strongKey"; // Store this securely

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(req.body);

    const newUser = new User({
      username,
      password,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  console.log(req.body);
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json('User not found');
  }

  if (password === user.password && role === user.role) { // Verify both password and role
    jwt.sign({ username, id: user._id, role: user.role }, secret, {}, (error, token) => {
      if (error) throw error;
      res.status(200).cookie('token', token).json({
        id: user._id,
        username,
        role: user.role
      });
    });
  } else {
    res.status(401).json('Wrong credentials');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.listen(8000, () => {
  console.log("server started at port 8000");
});
