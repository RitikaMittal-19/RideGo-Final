import React from 'react'

const LookingForDriver = (props) => {


     const vehicleImages = {
    car: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n",
    auto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
  };


  return (
    <div>
           <h5 onClick={()=>{
        props.setVehicleFound(false)}} className="p-3 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-down-wide-line"></i></h5>
       <h3 className="text-2xl font-semibold mb-3">Looking for Driver </h3>
       <div className='flex items-center flex-col justify-between gap-4'>
        <img className='h-25 ' 
        src={vehicleImages[props.vehicleType]}
        alt={props.vehicleType}
         />
        <div className='w-full mt-3'>
            <div className='flex items-center gap-5 border-b-2 border-gray-300 pb-2 mb-4 '>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-map-pin-fill"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>562/B </h3>
                    <p className='text-gray-500 font-light'>{props.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2  border-gray-300 pb-2 mb-4' >
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-navigation-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>42/E </h3>
                    <p className='text-gray-500 font-light'>{props.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2  border-gray-300 pb-2  mb-4'>
                 <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="text-lg ri-money-rupee-circle-line"></i></h2>
                <div className=''>
                    <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                    <p className='text-gray-500 font-light'>Pay in Cash</p>
                </div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default LookingForDriver