import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

import RideGoLogo from '../assets/ridelogo.png';

const UserLogin = () => {
  const [email,setEmail] =useState('')
  const [password, setPassword] = useState('')
const [userData, setuserData] = useState({})
const {user,setUser}=useContext(UserDataContext);
const navigate=useNavigate()

const submitHandler = async (e)=>{
  e.preventDefault()
  const userData={
    email:email,
    password:password
  }

  const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`,userData); 

  if(response.status===200){
    const data = response.data;
    setUser(data.user);
    localStorage.setItem('token',data.token);
    navigate('/home');
  }
  setEmail('')
  setPassword('')

}

  return (
    <div className='h-screen flex flex-col justify-between'>
         <div className='p-7'>
       <img
                className="w-24  mb-4"
                src={RideGoLogo}
                alt="RideGo Logo"
              />  
      <form onSubmit={(e)=>submitHandler(e)} >
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        required
        className='mb-4 h-10 bg-gray-50 px-4 border-2 border-gray-300 rounded-md w-full text-lg placeholder:text-sm placeholder:text-gray-400 '
         type="email" 
         value={email}
          onChange={(e)=>setEmail(e.target.value)}
         placeholder='Email' />
          
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

        <input 
        required 
        type="password"
         className='mb-4 h-10 bg-gray-50 px-4 border-2 border-gray-300 rounded-md w-full text-lg placeholder:text-sm placeholder:text-gray-400 '
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
         placeholder='password' />

        <button 
         className='mb-4 h-10 bg-[#111] text-white font-semibold px-4 border-2 border-gray-300 rounded-md 
         w-full text-lg placeholder:text-sm placeholder:text-gray-400 hover:bg-gray-700 '
      >Login</button>
     <p className='text-center'>New Here? 
       <Link
       to='/signup'
      className='text-blue-700 hover:text-red-400'> Create new Account</Link>
     </p>
      </form>
        </div>
        <div className='p-7'>
      <Link to='/captain-login'
      className='h-10 mb-4 bg-emerald-300 text-black font-semibold px-4 border-2 border-gray-300 
      rounded-md w-full text-lg placeholder:text-sm placeholder:text-gray-400 hover:bg-emerald-600 flex items-center justify-center '
     >Login as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin