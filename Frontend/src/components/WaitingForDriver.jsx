import React from 'react'

const WaitingForDriver = (props) => {
  return (
     <div>
           <h5 onClick={()=>{
        props.waitingForDriver(false)}} className="p-3 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-down-wide-line"></i></h5>
       <h3 className="text-2xl font-semibold mb-3">Driver Found</h3>
       <div className='flex items-center justify-between'>
         <img className='h-15 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
         <div className='text-right'>
          <h2 className='font-medium text-lg capitalize'>{props.ride?.captain.fullname.firstname + " "+ props.ride?.captain.fullname.lastname}</h2>
          <h4 className='font-medium text-2xl'>{props.ride?.captain.vehicle.plate}  </h4>
          <p className='font-light text-gray-400'>Maruti Suzuki</p>
          <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
         </div>
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
       </div>
    </div>
  )
}

export default WaitingForDriver