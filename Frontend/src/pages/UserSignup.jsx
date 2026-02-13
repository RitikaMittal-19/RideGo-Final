import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import RideGoLogo from '../assets/ridelogo.png';

const UserSignup = () => {

const [email,setEmail] =useState('')
const [password, setPassword] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [userData, setUserData] = useState({})
const navigate=useNavigate()

const {user,setUser}=React.useContext(UserDataContext);

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
  }  catch (error) {
  console.error("Signup failed:", error.response?.data || error.message);

  if (error.response?.data?.errors) {
    // Print all validation messages
    const messages = error.response.data.errors.map(err => err.msg).join('\n');
    alert(messages);
  } else {
    alert(error.response?.data?.message || "Signup failed. Please check your inputs.");
  }
}finally {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
};
  return (
    <div className='h-screen flex flex-col justify-between'>
         <div className='p-7'>
      <img
               className="w-24 mb-4"
               src={RideGoLogo}
               alt="RideGo Logo"
             /> 
      <form onSubmit={(e)=>submitHandler(e)} >

       <h3 className='text-lg font-medium mb-2'>Enter your Name</h3>
        <div className='flex gap-3'>
          <input 
             required
             className='mb-4 h-10 bg-gray-50 px-4 border-2 border-gray-300 rounded-md w-1/2 text-lg placeholder:text-sm placeholder:text-gray-400 '
             type="text" 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
             placeholder='First name' />
          <input 
             required
             className='mb-4 h-10 bg-gray-50 px-4 border-2 border-gray-300 rounded-md w-1/2 text-lg placeholder:text-sm placeholder:text-gray-400 '
             type="text" 
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder='Last name' />
          
        </div>
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
         className='mb-4 h-10 bg-[#111] text-white font-semibold px-4 border-2 border-gray-300 rounded-md w-full text-lg placeholder:text-sm placeholder:text-gray-400 hover:bg-gray-700 '
      >Sign in</button>
     <p className='text-center'>Already have an account? 
       <Link 
       to='/login'
      className='text-blue-700 hover:text-red-400' > Login</Link>
     </p>
      </form>
        </div>
        <div className='p-7 flex items-center justify-center' >
      <p>© 2025 Uber Technologies Inc.</p>
        </div>
    </div>
  )
}

export default UserSignup