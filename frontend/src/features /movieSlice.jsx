import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    watchedMovies: [],
    watchlistMovies: []
  },
  reducers: {
    addMovieToWatchlist(state, action) {
      state.watchlistMovies.push(action.payload)
    },
    removeMovieFromWatchlist(state, action) {
      state.watchlistMovies = state.watchlistMovies.filter(
        (movies) => movies.id !== action.payload
      )
    }
  }
})

export const selectAllWatchlistMovies = (state) => state.movies.watchlistMovies

export const {addMovieToWatchlist, removeMovieFromWatchlist} = movieSlice.actions;

export default movieSlice.reducer;