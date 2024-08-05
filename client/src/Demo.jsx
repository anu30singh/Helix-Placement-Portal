import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const API_URL=import.meta.env.VITE_API_URL;

const Demo = () => {
    const{user,setUser}=useContext(UserContext)
  useEffect(()=>{
    fetch(`${API_URL}/profile`,{
      credentials:'include'
    }).then(response=>{
      response.json().then(user=>{
        setUser(user)
      })
    })
  },[])
  function logout() {
    fetch(`${API_URL}/logout`,{
      credentials :'include',
      method:'POST',
    })
    setUser(null)
}
const username=user?.username
const role=user?.role
  return (
    <header className='w-full pt-3 pl-16 pr-12 h-16 flex justify-between items-center gap-12 bg-[#17181E]'>
      <div className="flex items-center justify-start gap-12">
      <Link to='/'><img src='./helix.png' width={90} height={90} className='object-contain'></img></Link>
      <Link to='/' className='text-[20px] font-medium font-sans text-white'>Home</Link>
      <Link to='/contact' className='text-[20px] font-medium font-sans text-white'>Contact</Link>
      {role === 'admin' && (
  <>
    <Link to='/drives' className='text-[20px] font-medium font-sans text-white'>Active Drives</Link>
    <Link to='/admin' className='text-[20px] font-medium font-sans text-white'>Dashboard</Link>
  </>
)}

{role === 'student' && (
  <>
    <Link to='/drives' className='text-[20px] font-medium font-sans text-white'>Active Drives</Link>
    <Link to='/student' className='text-[20px] font-medium font-sans text-white'>Edit Profile</Link>
  </>
)}

      </div>
      <div className='mr-10'>
              {username && (
          <>
            <a className='text-[20px] font-medium font-sans cursor-pointer text-white' onClick={logout}>Logout</a>
          </>
        )}
        {!username && (<>
          <Link to="/login" className="bg-transparent text-[20px] mr-6 font-medium font-sans border-white text-white px-2">Login</Link>
        <Link to="/register" className="bg-transparent text-[20px] font-medium font-sans text-white px-2">Register</Link>
        </>)}
        </div>
        
    </header>
  )
}

export default Demo