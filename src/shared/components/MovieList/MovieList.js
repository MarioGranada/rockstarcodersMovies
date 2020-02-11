import React, { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesAPI/moviesAPI';
import { TextField, FormControl, Button, FormLabel } from '@material-ui/core';
import Ratings from 'react-ratings-declarative';
import MovieItem from '../MovieItem/MovieItem';

import './MovieList.scss';

const MovieList = () => {
  const [moviesConfigState, setMoviesConfigState] = useState(null);

  const [moviesListState, setMoviesListState] = useState([]);

  const [moviesListCopyState, setMoviesListCopyState] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [ratingsValue, setRatingsValue] = useState(0);

  useEffect(() => {
    moviesAPI.getMoviesConfig().then(({ data }) => {
      setMoviesConfigState(data.images);
    });

    moviesAPI.getMovieList().then(({ data }) => {
      const { results } = data;
      setMoviesListState(results);
      setMoviesListCopyState(results);
    });
  }, []);

  const searchMoviesHandler = () => {
    moviesAPI.searchMovie(searchValue).then(({ data }) => {
      const { results } = data;
      setMoviesListState(results);
      setMoviesListCopyState(results);
    });
  };

  const newRatingsHandler = newRating => {
    let maxRating = newRating * 2;
    let minRating = maxRating - 2;

    let moviesListCopy = moviesListState.filter(
      item => item.vote_average >= minRating && item.vote_average <= maxRating
    );
    setMoviesListCopyState(moviesListCopy);
    setRatingsValue(newRating);
  };

  return (
    <>
      <div className="controls-row">
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
            onClick={searchMoviesHandler}
            disabled={!searchValue}
          >
            Search
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel>Rating:</FormLabel>
          <Ratings
            rating={ratingsValue}
            changeRating={newRatingsHandler}
            widgetRatedColors="red"
            widgetHoverColors="red"
          >
            <Ratings.Widget widgetRatedColor="red" widgetHoverColor="red" />
            <Ratings.Widget widgetRatedColor="red" widgetHoverColor="red" />
            <Ratings.Widget widgetRatedColor="red" widgetHoverColor="red" />
            <Ratings.Widget widgetRatedColor="red" widgetHoverColor="red" />
            <Ratings.Widget widgetRatedColor="red" widgetHoverColor="red" />
          </Ratings>
          <small
            className="clear-ratings"
            onClick={() => {
              setMoviesListCopyState(moviesListState);
              setRatingsValue(0);
            }}
          >
            Clear
          </small>
        </FormControl>
      </div>

      <div className="movie-list-container">
        {moviesListCopyState &&
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
