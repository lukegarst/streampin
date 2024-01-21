import { useState, useEffect } from 'react';
import MovieBox from './MovieBox';

const MOVIE_URL="https://api.themoviedb.org/3/movie/popular?api_key=bcc4ff10c2939665232d75d8bf0ec093";

const SearchBar = () => {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(MOVIE_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])
  

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const queryUrl = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
      const queryOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGI1ZTA1ODZmY2JlMmY2NDkzMmMwMGJjOTc5OWMzOSIsInN1YiI6IjY1NjU2OWMxMTU2Y2M3MDE0ZTY1Yjk3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LL63lMhpApZpPO4Ue8P_mPUpEhmWj15iOSFi4KFFs8g'
        }
      };

      const res = await fetch(queryUrl, queryOptions);
      const data = await res.json();
      console.log(data.results)
      setMovies(data.results)
    }
    catch(e){
      console.log(e);
    }
  }


  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  
  return <section className='form'>
      <form onSubmit = {searchMovie}>
        <div className="form-group">
          <input 
            type = 'search'
            onChange = {changeHandler} 
            value = {query}
            className = 'form-control' 
            id = 'search' 
            name = 'query'
            placeholder = 'Type to search...'>
          </input>
        </div>
      </form>
      <div>
      {movies.length > 0 ?(
        <div>
          {movies.map((movieReq)=> {return (
          <MovieBox data={movies} key={movieReq.id} {...movieReq}/>
          )
           })}
           
          
        </div>
      ):(
        <h2>No Movies Found</h2>
      )}
    </div>   
</section>

};

export default SearchBar