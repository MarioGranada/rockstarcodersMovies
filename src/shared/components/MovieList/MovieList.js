import React, { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesAPI/moviesAPI';
import { TextField, FormControl, Button } from '@material-ui/core';

import MovieItem from '../MovieItem/MovieItem';

import './MovieList.scss';

const MovieList = () => {
  const [moviesConfigState, setMoviesConfigState] = useState(null);

  const [moviesListState, setMoviesListState] = useState([]);

  const [moviesListCopyState, setMoviesListCopyState] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    moviesAPI.getMoviesConfig().then(({ data }) => {
      console.log('config', data);
      setMoviesConfigState(data.images);
    });

    moviesAPI.getMovieList().then(({ data }) => {
      const { results } = data;
      setMoviesListState(results);
      setMoviesListCopyState(results);
    });
  }, []);

  useEffect(() => {
    let moviesListCopy = moviesListState.filter(item =>
      item.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    setMoviesListCopyState(moviesListCopy);
  }, [moviesListState, filterValue]);

  const searchMovies = () => {
    moviesAPI.searchMovie(searchValue).then(({ data }) => {
      const { results } = data;
      setMoviesListState(results);
      setMoviesListCopyState(results);
    });
  };

  return (
    <>
      <FormControl>
        <TextField
          label="Search Movie"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={searchMovies}
          disabled={!searchValue}
        >
          Search
        </Button>
      </FormControl>

      <FormControl>
        <TextField
          label="Filter by name"
          value={filterValue}
          onChange={e => {
            setFilterValue(e.target.value);
          }}
        />
      </FormControl>

      <div className="movie-list-container">
        {moviesListCopyState.length &&
          moviesListCopyState.map(item => (
            // poster_sizes[2] refers to 'w185' size
            <MovieItem
              key={item.id}
              movie={item}
              posterSize={
                (moviesConfigState && moviesConfigState.poster_sizes[2]) || ''
              }
              imageURL={
                (moviesConfigState && moviesConfigState.secure_base_url) || ''
              }
            />
          ))}
      </div>
    </>
  );
};

export default MovieList;
