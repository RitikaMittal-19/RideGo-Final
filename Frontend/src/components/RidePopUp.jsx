import React from 'react'

const RidePopUp = (props) => {

  
  return (
    <div>
       <h5 onClick={()=>{
        props.setRidePopupPanel(false)
       }} className="pt-3 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-down-wide-line"></i></h5>
       <h3 className="text-2xl font-semibold mb-6 text-green-700">New Ride Available!</h3>
       <div className='flex items-center justify-between m-4 rounded-full bg-yellow-100 p-3'>
        <div className='flex items-center gap-4'>
         <img className='h-15 w-15 object-cover rounded-full' src="https://i.pinimg.com/736x/20/57/2b/20572baabbf418db9cfb52c5026fdce1.jpg" alt="" />
         <h4 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " "+ props.ride?.user.fullname.lastname}</h4>   
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
        <div className='flex items-center justify-between gap-8 '>
          <button onClick={()=>{
            props.confirmRide()
            props.setConfirmRidePopupPanel(true)
        }} className='p-4 w-1/2  bg-green-600 text-lg font-medium text-white rounded-full hover:bg-green-500 '>Accept</button>
         <button onClick={()=>{
           props.setRidePopupPanel(false)
        }} className='p-4 w-1/2 bg-gray-300 text-gray-500 text-lg font-medium  rounded-full hover:bg-gray-200'>Ignore</button>
      
        </div>
       </div>
    </div>
  )
}

export default RidePopUp