import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails.jsx';
import RidePopUp from '../components/RidePopUp.jsx'
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp.jsx';
import { useEffect ,useContext} from 'react';
import { SocketContext } from '../context/SocketContext.jsx';
import { UserDataContext } from '../context/UserContext.jsx';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import LiveTracking from '../components/LiveTracking'
import RideGoLogo from '../assets/ridelogo.png';
import axios from 'axios';


// ✅ Register GSAP plugin (must come after imports)
gsap.registerPlugin(useGSAP);


const CaptainHome = () => {



  const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
  const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)


  const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const {socket}=useContext(SocketContext);
    const {captain}=useContext(CaptainDataContext);

   useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                        console.log('Updating location to server:', {
                            userId: captain._id,
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

     socket.on('new-ride', (data) => {

        setRide(data)
        setRidePopupPanel(true)

    })

     async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }


   useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    
  return (
    <div className="h-screen">
        <div>
        <img
                      className="w-24 "
                      src={RideGoLogo}
                      alt="RideGo Logo"
                    /> 
        
          <Link to='/captain-home' className='w-10 h-10 fixed bg-white flex justify-center items-center rounded-lg m-2 right-2 top-2'>
           <i className="text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
        <div className='h-3/5'>
           <LiveTracking/>
        </div>
         <div className='h-2/5 mt-6'>
             <CaptainDetails/>       
          </div>
          
          <div ref={ridePopupPanelRef}className="fixed translate-y-full w-full z-10 bottom-0  px-3 py-10 pt-14  bg-white">
          <RidePopUp
          ride={ride} 
         confirmRide={confirmRide}
           setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
         </div>

          <div ref={confirmRidePopupPanelRef}className="fixed h-screen translate-y-full w-full z-10 bottom-0  px-3 py-10 pt-14  bg-white">
          <ConfirmRidePopUp 
          ride={ride}
          
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
         </div>
    </div>
  )
}

export default CaptainHome