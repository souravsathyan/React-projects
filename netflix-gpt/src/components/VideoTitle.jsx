import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-36 px-12'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className=''>
        <button className='bg-slate-500 text-black px-14 py-3 rounded-lg text-lg'> 
        <span><i className="fa-solid fa-play mr-2"></i></span>Play </button>
        <button className='bg-slate-500 text-black px-14 py-3 rounded-lg text-lg ml-2'><i className="fa-solid fa-circle-info mr-2"></i>More info</button>
      </div>
    </div>
  )
}

export default VideoTitle