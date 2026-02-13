import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')
    const navigate=useNavigate();

     const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }


    }

  return (
      <div >
       <h5 onClick={()=>{
        props.setConfirmRidePopupPanel(false)
       }} className="pt-3 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-down-wide-line"></i></h5>
       <h3 className="text-2xl font-semibold mb-6 text-green-700">Confirm Ride to Start!</h3>
       <div className='flex items-center justify-between m-4 rounded-full border-yellow-200 border-4 p-3'>
        <div className='flex items-center gap-4'>
         <img className='h-15 w-15 object-cover rounded-full' src="https://i.pinimg.com/736x/20/57/2b/20572baabbf418db9cfb52c5026fdce1.jpg" alt="" />
         <h4 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname + " "+ props.ride?.captain.fullname.lastname}</h4>   
        </div>
        <h5 className='mr-4 font-medium'>2.2 km</h5>
       </div>
       <div className='flex items-center flex-col justify-between gap-4'>

            <div className='w-full mt-3'>
            <div className='flex items-center gap-5 border-b-2 border-gray-300 pb-2 mb-4 '>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-map-pin-fill"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>562/B </h3>
                    <p className='text-gray-500 font-light'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2  border-gray-300 pb-2 mb-4' >
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-navigation-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>42/E </h3>
                    <p className='text-gray-500 font-light'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2  border-gray-300 pb-2  mb-4'>
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-money-rupee-circle-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>Rs.{props.ride?.fare}</h3>
                    <p className='text-gray-500 font-light'>Pay in Cash</p>
                </div>
            </div>
              </div>
        
        
        <div >
         <form action="" onSubmit={submitHandler} className='flex flex-col gap-4'>

            <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} type="text" placeholder='Enter OTP'  className="font-mono bg-[#eee] px-12 py-2 text-lg rounded-lg w-full placeholder:text-gray-400 text-center" />
            
            <div className=' mt-8 flex items-center justify-between gap-4 '>
         <button  className='w-1/2 flex justify-center p-3  bg-green-600 text-lg font-medium text-white rounded-full hover:bg-green-500 '>Confirm</button>
        
             <button onClick={()=>{
           props.setConfirmRidePopupPanel(false)
           props.setRidePopupPanel(false)

        }} className=' w-1/2 p-3 text-white bg-red-800 text-lg font-medium  rounded-full hover:bg-red-600'>Cancel</button>
      
            </div> 
         </form>
        </div>


       </div>
    </div>
  )
}

export default ConfirmRidePopUp