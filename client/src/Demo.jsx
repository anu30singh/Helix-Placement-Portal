import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Demo = () => {
    const{setUserInfo,userInfo}=useContext(UserContext)
  useEffect(()=>{
    fetch(`http://localhost:8000/profile`,{
      credentials:'include'
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])
  function logout() {
    fetch('http://localhost:8000/logout',{
      credentials :'include',
      method:'POST',
    })
    setUserInfo(null)
}
const username=userInfo?.username
  return (
    <div className="bg-[#17181E]">
              {username && (
          <>
            <a className='text-white' onClick={logout}>Logout</a>
          </>
        )}
        {!username && (<>
          <Link to="/login" style={{marginRight:"15px"}} className="bg-transparent border-white text-white px-2">Login</Link>
        <Link to="/register" className="bg-transparent text-white px-2">Register</Link>
        </>)}
              </div>
  )
}

export default Demo