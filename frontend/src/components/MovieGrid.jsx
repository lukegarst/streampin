import React from 'react'
import MovieCard from './MovieCard'
import { v4 as uuidv4 } from 'uuid';

const MovieGrid = ({movies}) => {

  return (
    <div>
      {movies.map((movies) => (
        <div key={uuidv4()}>
          <MovieCard movies={movies}/>
        </div>
      ))}
    </div>
  )
}

export default MovieGrid