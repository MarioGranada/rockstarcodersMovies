import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getMovieById } from '../../services/moviesAPI/moviesAPI';
import MovieRating from '../MovieRating/MovieRating';

import './MovieInfoModal.scss';

const MovieInfoModal = ({ isModalOpen, movieId, onModalClose, imageURL }) => {
  const [movieDataState, setMovieDataState] = useState(null);

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId).then(({ data }) => {
        setMovieDataState(data);
      });
    }
  }, [movieId]);

  return (
    movieDataState && (
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
        disableScrollLock={true}
        className="movie-info-modal"
      >
        <div className="movie-info-modal-container">
          <div className="modal-top-bar">
            <CloseIcon
              onClick={() => {
                onModalClose();
              }}
            />
          </div>

          <div className="movie-data-box">
            <div className="main-poster">
              {imageURL ? (
                <img
                  src={`${imageURL}/w500/${movieDataState.poster_path}`}
                  alt={movieDataState.title}
                />
              ) : null}
            </div>
            <div className="movie-data">
              <h3>{movieDataState.title}</h3>
              <MovieRating ratingsValue={movieDataState.vote_average / 2} />
              <div className="data-field">
                <span className="data-title">Popularity:</span>{' '}
                {movieDataState.popularity}
              </div>
              <div className="data-field">
                <span className="data-title">Language:</span>{' '}
                {movieDataState.original_language}
              </div>
              <div className="data-field">
                <span className="data-title">Runtime:</span>{' '}
                {movieDataState.runtime} min.
              </div>
              <div className="data-field">
                <span className="data-title">Overview:</span>{' '}
                {movieDataState.overview}
              </div>
              <div className="data-field">
                <span className="data-title">Genre:</span>{' '}
                {movieDataState.genres.map((item, index) => (
                  <span className="data-list-item" key={item.name}>
                    {item.name}
                    {index < movieDataState.genres.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <div className="data-field">
                <span className="data-title">Produced By:</span>{' '}
                {movieDataState.production_companies.map((item, index) => (
                  <span className="data-list-item" key={item.name}>
                    {item.name}
                    {index < movieDataState.production_companies.length - 1
                      ? ', '
                      : ''}
                  </span>
                ))}
              </div>
              <div className="data-field">
                <span className="data-title">Release Date:</span>{' '}
                {movieDataState.release_date}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default MovieInfoModal;
