require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db.Connection');
const User = require('./models/User');
const Contact=require('./models/contactSchema')
const JobListing = require('./models/JobSchema');
const myStudent = require('./models/newSchema');
const Application = require('./models/ApplicationSchema');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const secret = process.env.JWT_SECRET;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

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
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error during contact form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
  } else if (role !== user.role) {
    res.status(401).json('Access Denied');
  } else {
    res.status(401).json('Wrong credentials');
  }
});

app.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin portal' });
});

app.get('/student', authenticateToken, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Welcome to the student portal' });
});

app.post('/job-listings', async (req, res) => {
  const { companyName, description, ctc, role, qualification } = req.body;
  try {
    const newJobListing = new JobListing({
      companyName,
      description,
      ctc,
      role,
      qualification,
    });
    await newJobListing.save();
    res.status(201).json(newJobListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/job-listings', async (req, res) => {
  try {
    const jobListings = await JobListing.find();
    res.status(200).json(jobListings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get('/job-listings/count', async (req, res) => {
  try {
    const jobListingsCount = await JobListing.countDocuments();
    res.status(200).json({ count: jobListingsCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete('/job-listings/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await JobListing.findByIdAndDelete(id);
    if (deletedJob) {
      res.status(200).json({ message: 'Job listing deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job listing not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/job-listings/multiple', async (req, res) => {
  const jobListings = req.body;
  try {
    const newJobListings = await JobListing.insertMany(jobListings);
    res.status(201).json(newJobListings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to create a new student
app.post('/student-post',  async (req, res) => {
  const { username, firstName, lastName, contact, email, address, qualification, skills, city, board, stream, hscMarks, sscMarks } = req.body;
  try {
    const newStudent = new myStudent({
      username,
      firstName,
      lastName,
      contact,
      email,
      address,
      qualification,
      skills,
      city,
      board,
      stream,
      hscMarks,
      sscMarks
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/student-update/:username',  async (req, res) => {
  const { username } = req.params;
  const { firstName, lastName, contact, email, address, qualification, skills, city, board, stream, hscMarks, sscMarks } = req.body;
  try {
    const updatedStudent = await myStudent.findOneAndUpdate(
      { username },
      { firstName, lastName, contact, email, address, qualification, skills, city, board, stream, hscMarks, sscMarks },
      { new: true }
    );
    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to check if a student exists by username
app.get('/student-exists/:username',  async (req, res) => {
  const { username } = req.params;
  try {
    const student = await myStudent.findOne({ username });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/student-get', async (req, res) => {
  try {
    const studentData = await myStudent.find();
    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/student/count', async (req, res) => {
  try {
    const studentCount = await myStudent.countDocuments();
    res.status(200).json({ count: studentCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/student/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await myStudent.findByIdAndDelete(id);
    if (deletedJob) {
      res.status(200).json({ message: 'Job listing deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job listing not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/apply', async (req, res) => {
  const { jobId, username } = req.body;

  if (!jobId || !username) {
    return res.status(400).json({ error: 'Missing jobId or username' });
  }

  try {
    const student = await myStudent.findOne({ username });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (student.status === 'Placed') {
      return res.status(403).json({ error: 'Student is already placed and cannot apply for jobs' });
    }

    const existingApplication = await Application.findOne({ company: jobId, student: student._id });
    if (existingApplication) {
      return res.status(409).json({ error: 'Student has already applied to this job' });
    }
    
    const application = new Application({
      company: jobId,
      student: student._id,
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error during application submission:', error); 
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student') 
      .populate('company');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/applications/count', async (req, res) => {
  try {
    const applicationCount = await Application.countDocuments();
    res.status(200).json({ count: applicationCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/applications/student/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const student = await myStudent.findOne({ username });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const applications = await Application.find({ student: student._id })
      .populate('student') 
      .populate('company');

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/applications/accept/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const student = await myStudent.findById(application.student);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.status = 'Placed';
    await student.save();
    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Application accepted, student placed, and application deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/applications/accept-app/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const student = await myStudent.findById(application.student);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.status = 'Interview Scheduled';
    await student.save();

    res.status(200).json({ message: 'Application accepted', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example of a POST endpoint for scheduling interviews
app.post('/interviews', async (req, res) => {
  const { applicationId, interviewDate } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.interviewDate = interviewDate;
    await application.save();

    res.status(201).json({ message: 'Interview scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/interviews', async (req, res) => {
  try {
    const interviews = await Application.find({ interviewDate: { $exists: true } })
      .populate('student')
      .populate('company');
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/applications/reject/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json({ message: 'Application rejected and deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

