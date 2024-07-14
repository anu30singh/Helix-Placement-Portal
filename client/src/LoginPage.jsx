import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to student role
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
        role, // Send role to the server
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('wrong credentials');
      } else {
        console.error(error);
        alert('An error occurred.');
      }
    }

    setUsername('');
    setPassword('');
  };

  if (redirect) {
    return <Navigate to={'/apply'} />;
  }

  return (
    <div style={styles.container}>
      <img src="/sphere-1.png" alt="sphere1" style={styles.sphere1} />
      <img src="/sphere.png" alt="sphere2" style={styles.sphere2} />
      <form style={styles.form} onSubmit={login}>
        <h1 style={styles.title}>Sign In.</h1>
        <button type="button" style={styles.socialButton}>
          <i className="bi bi-google" style={styles.icon}></i><span style={styles.myText}> Continue with Google</span>
        </button>
        <button type="button" style={styles.socialButton}>
          <i className="bi bi-facebook" style={styles.icon}></i><span style={styles.myText}> Continue with Facebook</span>
        </button>
        <p style={styles.or}>or</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
          className='input'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.submitButton}><span style={styles.title}>Sign In.</span></button>
        <p style={styles.footerText}>
          Don't have an account? <a href="/register" style={styles.link}>Create an account</a>
        </p>
        <a href="/forgot-password" style={styles.link}>Forgot password?</a>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#17181E',
    position: 'relative',
  },
  sphere1: {
    position: 'absolute',
    top: '0%',
    left: '20%',
    width: '170px',
    height: '110px',
  },
  sphere2: {
    position: 'absolute',
    top: '10%',
    right: '25%',
    width: '80px',
    height: '80px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#17181E',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  title: {
    color: 'white',
    marginBottom: '20px',
    fontWeight:'600',
    fontFamily:'sans-serif'
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17181E',
    color: 'white',
    border: 'solid 0.1px rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    cursor: 'pointer',
  },
  myText:{
     color:'rgba(255, 255, 255, 0.7)'
  },
  icon: {
    marginRight: '10px',
  },
  or: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '15px',
  },
  input: {
    backgroundColor: '#17181E',
    color: 'white',
    border: 'solid 0.1px rgba(255, 255, 255, 0.3)',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#7f00ff',
    backgroundImage: 'linear-gradient(to right, #e100ff, #7f00ff)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    width: '100%',
    cursor: 'pointer',
  },
  footerText: {
    color: ' rgba(255, 255, 255, 0.8)',
    marginBottom: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight:'600',
  },
};

export default LoginPage;
