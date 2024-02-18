import { YOUTUBE_LINK } from "../Utils/constants";
import useMovieTrailer from "../Utils/hooks/useMovieTrailer"
import {  useSelector } from "react-redux";

const VideoBackground = (movieId) => {
  const movieTrailer = useSelector((store) => store?.movies?.trailerVideo);

  useMovieTrailer(movieId)

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={YOUTUBE_LINK + movieTrailer }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
