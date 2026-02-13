import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
        props.setVehiclePanel(false)}} className="p-3 text-center w-full absolute top-0"> <i className="text-xl text-gray-400  ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle </h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
            }} className="flex w-full items-center justify-between px-3 py-5 rounded-lg shadow-lg border-2 border-gray-300 active:border-black hover:border-black mb-2">
            <img className='h-18 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className="w-1/2 -ml-5">
                <h4 className="font-medium text-base">RideCab <span> <i className="ri-user-3-fill"></i>4</span></h4>
                <h5 className="font-medium text-small">2 mins away</h5>
                <p className="font-light text-xs text-gray-500">Affordable, compact rides</p>
            </div>
             <h2 className="text-xl font-semibold w-1/4 text-right pr-3">₹{props.fare.car}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
             props.selectVehicle('moto')
             }} className="flex w-full items-center justify-between px-3 py-5 rounded-lg shadow-lg border-2 border-gray-300  active:border-black hover:border-black  mb-2">
            <img className='h-18 ' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
            <div className="w-1/2 ">
                <h4 className="font-medium text-base">RideMoto <span> <i className="ri-user-3-fill"></i>1</span></h4>
                <h5 className="font-medium text-small">5 mins away</h5>
                <p className="font-light text-xs text-gray-500">Affordable motorcycle rides</p>
            </div>
             <h2 className="text-xl font-semibold w-1/4 text-right pr-3">₹{props.fare.moto}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
             props.selectVehicle('auto')
             }} className="flex w-full items-center justify-between px-3 py-5 rounded-lg shadow-lg border-2 border-gray-300  active:border-black hover:border-black  mb-2">
            <img className='h-18 ' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
            <div className="w-1/2 ">
                <h4 className="font-medium text-base">RideAuto <span> <i className="ri-user-3-fill"></i>2</span></h4>
                <h5 className="font-medium text-small">10 mins away</h5>
                <p className="font-light text-xs text-gray-500">Affordable rickshaw rides</p>
            </div>
             <h2 className="text-xl font-semibold w-1/4 text-right pr-3">₹{props.fare.auto}</h2>
        </div>
    </div>
  )

}

export default VehiclePanel