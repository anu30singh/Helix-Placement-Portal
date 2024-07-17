const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db.Connection');
const User = require('./models/User'); 
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

// Middleware for checking authentication
const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Middleware for checking roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Routes
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
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
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json('User not found');
  }
  if (password === user.password && role === user.role) {
    jwt.sign({ username, id: user._id, role: user.role }, secret, {}, (error, token) => {
      if (error) throw error;
      res.status(200).cookie('token', token).json({
        id: user._id,
        username,
        role: user.role
      });
    });
  } else if(role !== user.role){
    res.status(401).json('Access Denied');
  }
  else{
    res.status(401).json('Wrong credentials');
  }
});

app.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

// Admin routes
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin portal' });
});

// Student routes
app.get('/student', authenticateToken, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Welcome to the student portal' });
});

app.listen(8000, () => {
  console.log("server started at port 8000");
});
