import React from 'react';

import './MovieItem.scss';

const MovieItem = ({ movie, posterSize, imageURL }) => {
  return (
    <div className="movie-item-box">
      {imageURL && posterSize && movie.poster_path ? (
        <img
          src={`${imageURL}/${posterSize}/${movie.poster_path}`}
          alt={movie.title}
        />
      ) : null}
      <span className="movie-title">{movie.title}</span>
    </div>
  );
};

export default MovieItem;
