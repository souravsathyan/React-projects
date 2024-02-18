import  { useEffect,  } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";
import { API_OPTIONS } from "../constants";

const useMovieTrailer = (movieId)=>{
    const dispatch = useDispatch();
  
    const getMovieVideo = async (movieId) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/1022796/videos?language=en-US`,
        API_OPTIONS
      );
  
      const data = await response.json();
  
      const filterData = data.results.filter((video) => video.type === "Trailer");
    console.log(filterData)
      const trailer = filterData.length ? filterData[1] : data.results[0];
      const { key } = trailer;
      
      dispatch(addTrailerVideo(key));
    };
    useEffect(() => {
      getMovieVideo(movieId);
    }, []);
}

export default useMovieTrailer