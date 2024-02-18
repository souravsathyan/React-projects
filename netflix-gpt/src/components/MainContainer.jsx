import React from "react";
import { useSelector } from "react-redux";
import VideoBackgrond from "./VideoBackground"
import VideoTitle from "./VideoTitle"
import {addVideoIndex} from "X ZDSBGZVcaxdb"

const MainContainer = () => {
  const movieSelector = useSelector((store) => store.movies?.nowPlayingMovies);
  
  if(!movieSelector) return 
  
  const movie = movieSelector[(Math.floor(Math.random() * movieSelector.length))]
  const {original_title, overview, id} = movie
  const indexOfMovie = movieSelector.indexOf(movie);

  return (
  <div>
    <VideoBackgrond movieId={id}/>
    <VideoTitle title={original_title} overview={overview}/>
  </div>
  );
};

export default MainContainer;
