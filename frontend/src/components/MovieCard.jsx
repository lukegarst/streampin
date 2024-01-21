import React from 'react'
import { Button } from 'react-bootstrap'
import { removeMovieFromWatchlist } from '../features /movieSlice'
import { useDispatch } from 'react-redux'

const MovieCard = ({movies}) => {
  const dispatch = useDispatch();
  return (
    <div>
       <img alt='movie' style={{width:'200px', height:'300px', marginTop:'30px', boxShadow:'10px 10px 5px black'}} src={"https://image.tmdb.org/t/p/w500/"+movies.poster_path} />
       <div className="remove">
        <Button onClick={() => dispatch(removeMovieFromWatchlist(movies.id))}>Remove</Button>
      </div>
    </div>
  )
}

export default MovieCard