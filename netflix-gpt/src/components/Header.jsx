import React from 'react'
import { LOGO } from '../Utils/constants'

const Header = () => {
  return (
    <div className='w-full absolute px-8 py-2 bg-gradient-to-b from-black  z-50'>
        <img className='w-44' src={LOGO} alt="logo" />
    </div>
  )
}

export default Header