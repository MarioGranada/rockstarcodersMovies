import React from 'react';

import './MovieItem.scss';

const MovieItem = ({ movie, posterSize, imageURL, onMovieClick }) => {
  return (
    <div className="movie-item-box" onClick={onMovieClick}>
      {imageURL && posterSize && movie.poster_path ? (
        <img
          src={`${imageURL}/${posterSize}/${movie.poster_path}`}
          alt={movie.title}
        />
      ) : null}
      <h4 className="movie-title">{movie.title}</h4>
    </div>
  );
};

export default MovieItem;
