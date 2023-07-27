import React, { useContext } from 'react'
import {AiOutlinePlus} from 'react-icons/ai';
import GlobalContext from '../context/GlobalContext';
const SidebarBuutton = () => {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <div >
        <button 
        onClick={() => setShowEventModal(true)}
        className=' flex items-center justify-center rounded-full border py-1 px-2 shadow-md hover:shadow-lg'>
      <AiOutlinePlus className='text-yellow-500 w-5 h-5 mr-2' />
Create
        </button>
      
    </div>
  )
}

export default SidebarBuutton
