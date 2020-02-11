import React from 'react';

import './MovieItem.scss';

const MovieItem = ({ movie, posterSize, imageURL }) => {
  return (
    <div className="movie-item-box">
      {movie.title}
      {imageURL && posterSize && movie.poster_path ? (
        <img
          src={`${imageURL}/${posterSize}/${movie.poster_path}`}
          alt={movie.title}
        />
      ) : null}
    </div>
  );
};

export default MovieItem;
