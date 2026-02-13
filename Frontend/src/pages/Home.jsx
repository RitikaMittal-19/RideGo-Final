import React, { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext.jsx";
import { UserDataContext } from "../context/UserContext.jsx";
import LiveTracking from "../components/LiveTracking.jsx";

import RideGoLogo from '../assets/ridelogo.png';


// ✅ Register GSAP plugin (must come after imports)
gsap.registerPlugin(useGSAP);

const Home = () => {
  // ------------------ STATE ------------------
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [activeField, setActiveField] = useState("");
   const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [vehicleType,setVehicleType]=useState(null)
    const [ ride, setRide ] = useState(null)

    const {socket}=useContext(SocketContext);
    const {user}=useContext(UserDataContext);
    const navigate=useNavigate();
    
  useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

     socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

     socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })



  // ------------------ REFS ------------------
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);   
    const vehicleFoundRef=useRef(null);
     const waitingForDriverRef = useRef(null)   




  // ------------------ HANDLERS ------------------
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const findTrip = async () => {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFare(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };


  async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


    }
  // ------------------ GSAP ANIMATION ------------------
  useGSAP(
    () => {
      if (!panelRef.current || !panelCloseRef.current) return;

      if (panelOpen) {
        gsap.to(panelRef.current, { height: "70%", padding: 24, duration: 0.5, ease: "power2.out" });
        gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(panelRef.current, { height: "0%", padding: 0, duration: 0.5, ease: "power2.in" });
        gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.3 });
      }
    },
    { dependencies: [panelOpen] } // ✅ correct syntax for @gsap/react v2+
  );
useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

      useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])



  // ------------------ RENDER ------------------
  return (
    <div className="h-screen relative overflow-hidden ">
        <img
                className="w-24 "
                src={RideGoLogo}
                alt="RideGo Logo"
              />

      <div  className="h-screen w-screen ">
        <LiveTracking/>
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5>
            {/* ✅ add ref here for animation target */}
            <i ref={panelCloseRef} className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form className="relative py-3" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full placeholder:text-gray-400"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 placeholder:text-gray-400"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className=' mt-4 w-full p-3 text-white bg-black text-lg font-medium  rounded-full hover:bg-gray-400'>
              Find Trip</button>
        </div>
       
       <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
      </div>

      //vehicle selection panel
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-14  bg-white">
      < VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

       // confirm ride  panel
      <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-14  bg-white">
         <ConfirmRide
         pickup={pickup}
         destination={destination}
           createRide={createRide}
           fare={fare}
           vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicleFound={setVehicleFound}/>
      </div>

     // look for driver panel
      <div ref={vehicleFoundRef}  className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-14  bg-white">
       < LookingForDriver
        pickup={pickup}
         destination={destination}
           createRide={createRide}
           fare={fare}
           vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}/>
      </div>

       //wait for ride  panel
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0  px-3 py-6 pt-14  bg-white">
       < WaitingForDriver
       ride={ride}
       setVehicleFound={setVehicleFound}
       setWaitingForDriver={setWaitingForDriver}
       waitingForDriver={waitingForDriver}/>
      </div>


    </div>
  );
};

export default Home;