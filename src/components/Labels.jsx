import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const Labels = () => {
  const {labels, updateLabel} = useContext(GlobalContext)
  return (
    <div>
      {labels?.map(({label, checked},i) => (
        <div key={i} className='flex items-center space-x-2'>
          <input
          onChange={() => updateLabel({label , checked : !checked})}
          type='checkbox' checked={checked} className={`bg-yellow-500 w-4 h-4 checked:text-white`} style={{accentColor : label}} />
          <span style={{color : label}}>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default Labels
