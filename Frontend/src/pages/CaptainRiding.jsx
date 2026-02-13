import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import "remixicon/fonts/remixicon.css";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';


// ✅ Register GSAP plugin (must come after imports)
gsap.registerPlugin(useGSAP);


const CaptainRiding = () => {

     const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location=useLocation();
    const  rideData=location.state?.ride;

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])




  return (
    <div className="h-screen relative flex flex-col justify-end">
      
        <div>
        <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
          <Link to='/captain-home' className='w-10 h-10 fixed bg-white flex justify-center items-center rounded-lg m-2 right-2 top-2'>
           <i className="text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
    
       
         <div className='h-1/5 p-3 gap-6 bg-yellow-200 flex justify-center items-center relative' onClick={()=>{
                setFinishRidePanel(true)
       }} >
            <h5 onClick={()=>{
                setFinishRidePanel(true)
       }} className="pb-2 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-up-wide-line"></i></h5>
      
            <h5 className='font-medium text-lg'>5 kms away</h5>
            <button className='p-3 text-gray-700 bg-white text-xl font-semibold  rounded-3xl hover:bg-gray-100'>Complete Ride</button>
          </div>
          
         <div ref={finishRidePanelRef}className="fixed translate-y-full w-full z-10 bottom-0  px-3 py-10 pt-14  bg-white">
          <FinishRide 
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}  />
         </div>
          <div className='h-screen w-screen fixed z-[-1] top-0 '>
            <LiveTracking/>
        </div>


    </div>
  )
}

export default CaptainRiding