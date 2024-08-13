import React, { useContext } from 'react'
import { UserContext } from './UserContext'

const Unauthorized = () => {
    const{user,setUser}=useContext(UserContext)
    const role=user?.role
  return (
    <div className='w-full bg-[#17181E] h-screen flex flex-col justify-start items-center pt-10'>
        <h1 className="text-4xl font-semibold text-white montserrat-font">Unauthorized</h1>
        <h1 className="mt-2 text-4xl font-semibold text-white montserrat-font">{role?`${role}s can't access this page`:`Login to continue browsing`}</h1>
    </div>
  )
}

export default Unauthorized