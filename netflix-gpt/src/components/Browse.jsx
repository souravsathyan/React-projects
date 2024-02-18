import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../Utils/hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SeccondaryCOntainer from './SeccondaryCOntainer'

const Browse = () => {
 

  useNowPlayingMovies()

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SeccondaryCOntainer/>
    </div>
  )
}

export default Browse