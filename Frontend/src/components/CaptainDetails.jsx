import React from 'react'
import { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainDetails = () => {

  const {captain}= useContext(CaptainDataContext);

  return (
    <div>
          <div className=' flex items-center justify-between pr-6 pl-6'>
                      <div  className=' flex items-center justify-start gap-3'>
                      <img className='h-15 w-15 object-cover rounded-full' src="https://media.gettyimages.com/id/1752533660/video/happy-worker-and-face-of-business-asian-man-in-office-with-pride-confidence-and-ambition-in.jpg?s=640x640&k=20&c=FPPyepfVwPRmGudzLY-RkfVPiT1lPE_wBZ2WQZVGUOM=" alt="" />
                      <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                     </div>
                     <div  className=' flex items-center flex-col gap-3'>
                      <h4 className='text-xl font-semibold'>Rs. 548.39</h4>
                      <p className='text-gray-300 font-light'>Earned Today</p>
                      </div>
              </div>
              <div className='flex p-5 rounded-full bg-gray-100 items-start justify-center gap-[15%] mt-6 mr-6 ml-6'>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-small text-gray-300'>Hours online</p>
                  </div>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-dashboard-3-line"></i>
                     <h5 className='text-lg font-medium'>140.2</h5>
                    <p className='text-small text-gray-300'>Speed </p>
                  </div>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-edit-line"></i>
                     <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-small text-gray-300'>Hours note</p>
                  </div>  
                </div>
    </div>
  )
}

export default CaptainDetails