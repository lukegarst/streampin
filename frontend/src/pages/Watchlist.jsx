import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAllWatchlistMovies } from '../features /movieSlice';
import MovieGrid from '../components/MovieGrid';

function Watchlist() {
  const navigate = useNavigate()

  const watchlistMovies = useSelector(selectAllWatchlistMovies)
  const {user} = useSelector((state) => state.auth)

  console.log('watchlistMovies', watchlistMovies)

  useEffect(()=> {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h5>{user && user.name}'s Watchlist</h5>
      </section>

      <div>
        {watchlistMovies.length > 0 ? (
          <>
            <MovieGrid movies={watchlistMovies} />
          </>
        ) : (
          <>
          <h2>Please add movie</h2>
          </>)}
      </div>
    </>
  )
}

export default Watchlist