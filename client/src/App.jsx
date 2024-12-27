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
import Candidates from './Candidates';
import ApplicationsPage from './ApplicationsPage';
import InterviewScheduler from './InterviewScheduler';
import Unauthorized from './Unauthorized';
import AdminRequests from './AdminRequest';
import Courses from './Courses';
import AddCourseForm from './AddCourseForm';
import { CartContext, CartProvider } from './CartContext';
import CartPage from './CartPage';
import Stats from './Stats';
function App() {
  const slides = [
    { url: './hero-carousel-1.svg', alt: 'Image 1' },
    { url: './hero-carousel-2.svg', alt: 'Image 2' },
    { url: './hero-carousel-3.svg', alt: 'Image 3' },
  ];
  return (
    <UserContextProvider>
      <CartProvider>
      <BrowserRouter>
        <Demo />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
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
          <Route path="/line-chart" element={
            <ProtectedRoute role="admin">
              <Stats/>
            </ProtectedRoute>
          } />
          <Route path="/admin/interview" element={
            <ProtectedRoute role="admin">
              <InterviewScheduler />
            </ProtectedRoute>
          } />
          <Route path="/handle-admin" element={
            <ProtectedRoute role="admin">
              <AdminRequests />
            </ProtectedRoute>
          } />
          <Route path="/add-course" element={
            <ProtectedRoute role="admin">
              <AddCourseForm />
            </ProtectedRoute>
          } />
          <Route path="/drives" element={
            <ProtectedRoute role={['student','admin']}>
            <ActiveDrives />
          </ProtectedRoute>
          }  />
          <Route path="/candidates" element={
            <ProtectedRoute role={['student','admin']}>
            <Candidates />
          </ProtectedRoute>
          }  />
          <Route path="/courses" element={
            <ProtectedRoute role={['student','admin']}>
            <Courses />
          </ProtectedRoute>
          }  />
           <Route path="/cart" element={
            <CartPage />
          }  />
          <Route path="/drive/applications" element={
            <ProtectedRoute role={['student','admin']}>
            <ApplicationsPage />
          </ProtectedRoute>
          }  />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
