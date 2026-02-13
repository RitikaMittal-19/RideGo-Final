import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

import RideGoLogo from '../assets/ridelogo.png';

const CaptainSignup = () => {

  const navigate=useNavigate()

  const [email,setEmail] =useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [captainData, setCaptainData] = useState({})


  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')



  const {captain,setCaptain}=React.useContext(CaptainDataContext);
  
   const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  
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
 <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>

           <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

        <button 
         className='mb-4 h-10 bg-[#111] text-white font-semibold px-4 border-2 border-gray-300 rounded-md w-full text-lg placeholder:text-sm placeholder:text-gray-400 hover:bg-gray-700 '
          >Sign in</button>

     <p className='text-center'>Already a Captain? 
       <Link 
       to='/captain-login'
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

export default CaptainSignup