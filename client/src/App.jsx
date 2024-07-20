import { useContext, useState } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import Demo from './Demo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import Signup from './RegisterPage';
import AdminPage from './AdminPage';
import StudentPage from './StudentPage';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Contact from './Contact';
import Footer from './Footer';
import PostDrive from './PostDrive';
import ActiveDrives from './ActiveDrives';

function App() {
  const slides = [
    { url: './hero-carousel-1.svg', alt: 'Image 1' },
    { url: './hero-carousel-2.svg', alt: 'Image 2' },
    { url: './hero-carousel-3.svg', alt: 'Image 3' },
  ];
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Demo />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home slides={slides} autoSlide={true} autoSlideInterval={5000} />} />
          <Route path="/student" element={
            <ProtectedRoute role="student">
              <StudentPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/post" element={
            <ProtectedRoute role="admin">
              <PostDrive />
            </ProtectedRoute>
          } />
          <Route path="/drives" element={<ActiveDrives />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
