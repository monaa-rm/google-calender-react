import React from 'react'
import SidebarBuutton from './SidebarBuutton'
import SmallCalendar from './SmallCalendar'
import Labels from './Labels'

const Sidebar = () => {
  return (
    <div className='border-t pt-4 px-3 w-64'>
      <SidebarBuutton />
      <SmallCalendar />
      <Labels />
    </div>
  )
}

export default Sidebar
