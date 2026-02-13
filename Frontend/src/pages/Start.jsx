import React from 'react';

import RideGoLogo from '../assets/ridelogo.png';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
     <div>
      <div className= 'bg-cover bg-center bg-[url(https://media.wired.com/photos/593257829be5e55af6c24476/3:2/w_2560%2Cc_limit/trafficlight-inline.jpg)] h-screen flex justify-between flex-col items-center bg-gray-100'>
        <img
          className="w-24 ml-9 mt-4"
          src={RideGoLogo}
          alt="RideGo Logo"
        />
 <div className="text-center pb-7 mb-10 px-4 py-4 bg-white">
        <h2 className="text-3xl font-semibold mb-4 text-black">Get Started with RideGo</h2>
        <Link to="/login" className=" flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-500 ">
          Continue
        </Link>
      </div>
      </div>
      
    </div>
  );
}
export default Start