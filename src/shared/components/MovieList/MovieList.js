import React, { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/moviesAPI/moviesAPI';
import { TextField, FormControl, Button } from '@material-ui/core';
import MovieItem from '../MovieItem/MovieItem';
import MovieInfoModal from '../MovieInfoModal/MovieInfoModal';
import MovieRating from '../MovieRating/MovieRating';

import './MovieList.scss';

const MovieList = () => {
  const [moviesConfigState, setMoviesConfigState] = useState(null);

  const [moviesListState, setMoviesListState] = useState([]);

  const [moviesListCopyState, setMoviesListCopyState] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [ratingsValue, setRatingsValue] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentMovieId, setCurrentMovieId] = useState(null);

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

  const onClearRatingsHandler = () => {
    setMoviesListCopyState(moviesListState);
    setRatingsValue(0);
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

        <MovieRating
          includeClear={true}
          onClearRating={onClearRatingsHandler}
          ratingsValue={ratingsValue}
          newRatingsHandler={newRatingsHandler}
        />
      </div>

      <div className="movie-list-container">
        {moviesListCopyState &&
          moviesListCopyState.map(item => (
            <MovieItem
              key={item.id}
              movie={item}
              posterSize={
                (moviesConfigState && moviesConfigState.poster_sizes[2]) || ''
              }
              imageURL={
                (moviesConfigState && moviesConfigState.secure_base_url) || ''
              }
              onMovieClick={() => {
                setIsModalOpen(true);
                setCurrentMovieId(item.id);
              }}
            />
          ))}
      </div>

      <MovieInfoModal
        isModalOpen={isModalOpen}
        onModalClose={() => {
          setIsModalOpen(false);
        }}
        movieId={currentMovieId}
        imageURL={
          (moviesConfigState && moviesConfigState.secure_base_url) || ''
        }
      />
    </>
  );
};

export default MovieList;
