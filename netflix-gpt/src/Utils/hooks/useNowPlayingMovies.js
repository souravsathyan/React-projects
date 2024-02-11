import { useEffect } from 'react'
import { API_OPTIONS } from '../constants'
import { addNowPlayingMovie } from '../store/movieSlice'
import {useDispatch} from "react-redux"

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
        const json = await data.json()
        console.log(json)
        dispatch(addNowPlayingMovie(json.results))
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies