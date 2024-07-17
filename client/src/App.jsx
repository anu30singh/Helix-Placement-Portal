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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
