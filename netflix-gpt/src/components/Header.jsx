import React, { useEffect } from 'react'
import { LOGO, USER_AVATAR } from '../Utils/constants'
import { signOut } from 'firebase/auth'
import { auth } from '../Utils/firebase'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { addUser,removeUser } from '../Utils/store/userSlice'
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store)=>store.user)

  const handleSignOut =()=>{
    signOut(auth).then(()=>{
      dispatch(removeUser())
      navigate('/')
    }).catch((error)=>{

    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse')
    } else {
        dispatch(removeUser())
        navigate('/')
      }
    });
  }, []);

  return (
    <div className='flex justify-between w-full absolute px-8 py-2 bg-gradient-to-b from-black  z-50'>
        <img className='w-44' src={LOGO} alt="logo" />

      {
        user && (
          <div className='flex p-2'>
        <img className='w-12 h-12 ' src={USER_AVATAR} alt="" />
        <button onClick={handleSignOut} className='text-white font-bold'>(Sign Out)</button>
      </div>
        )
      }

    </div>
  )
}

export default Header