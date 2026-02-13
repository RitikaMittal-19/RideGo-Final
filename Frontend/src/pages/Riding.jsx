import React from 'react'
import { Link,useLocation } from 'react-router-dom'

import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Riding = () => {

   
    const location=useLocation();
    const  {ride}=location.state || {};
     const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

     socket.on("ride-ended", () => {
        navigate('/home')
    })

  return (

    <div className="h-screen">
        <Link to='/home' className='w-15 h-15 fixed bg-white flex justify-center items-center rounded-lg m-2 right-2 top-2'>
            <i className="text-3xl font-black ri-home-3-line"></i>
        </Link>
        <div className='h-1/2'>
            <LiveTracking/>
        </div>
         <div className='h-1/2 mt-6'>
            <div className='flex items-center justify-between'>
              <img className=' ml-6 h-20 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <div className='text-right mr-6'>
                  <h2 className='font-medium text-lg'>{ride?.captain.fullname.firstname + " "+ ride?.captain.fullname.lastname}</h2>
                  <h4 className='font-medium text-2xl'>{ride?.captain.vehicle.plate}</h4>
                  <p className='font-light text-gray-400'>Maruti Suzuki</p>
             </div>
         </div>
         <div className='flex items-center flex-col justify-between gap-4 mr-6 ml-6 mt-4'>
             <div className='w-full mt-3 mr-6 ml-6'>
           
             <div className='flex items-center gap-5 border-b-2  border-gray-100 pb-2 mb-4' >
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-navigation-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>42/E </h3>
                    <p className='text-gray-500 font-light'>{ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2  border-gray-100 pb-2  mb-4'>
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-money-rupee-circle-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>Rs.193.20 </h3>
                    <p className='text-gray-500 font-light'>Pay in Cash</p>
                </div>
            </div>
        </div>
                   </div>

                <div className='pr-6 pl-6'>
                      <button className='w-full mt-2 h-8 bg-green-600 text-lg font-medium text-white rounded-3xl mb-5'>Make a Payment </button>
       
                </div>
        </div>
    </div>
  )
}

export default Riding