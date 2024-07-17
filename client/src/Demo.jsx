import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Demo = () => {
    const{user,setUser}=useContext(UserContext)
  useEffect(()=>{
    fetch(`http://localhost:8000/profile`,{
      credentials:'include'
    }).then(response=>{
      response.json().then(user=>{
        setUser(user)
      })
    })
  },[])
  function logout() {
    fetch('http://localhost:8000/logout',{
      credentials :'include',
      method:'POST',
    })
    setUser(null)
}
const username=user?.username
  return (
    <header className='w-full h-10 flex justify-center items-center gap-12 bg-[#17181E]'>
              {username && (
          <>
            <a className='text-white' onClick={logout}>Logout</a>
          </>
        )}
        {!username && (<>
          <Link to="/login" style={{marginRight:"15px"}} className="bg-transparent text-[20px] font-medium font-sans border-white text-white px-2">Login</Link>
        <Link to="/register" className="bg-transparent text-[20px] font-medium font-sans text-white px-2">Register</Link>
        </>)}
        <p className='text-[20px] font-medium font-sans text-white'>FAQ</p>
        <Link to='/' className='text-[20px] font-medium font-sans text-white ml-4'>Home</Link>
    </header>
  )
}

export default Demo