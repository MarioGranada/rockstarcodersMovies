import React from 'react';
import Ratings from 'react-ratings-declarative';
import { FormControl, FormLabel } from '@material-ui/core';

const MovieRating = ({
  includeClear,
  onClearRating,
  ratingsValue,
  newRatingsHandler
}) => {
  return (
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
      {includeClear && (
        <small className="clear-ratings" onClick={onClearRating}>
          Clear
        </small>
      )}
    </FormControl>
  );
};

export default MovieRating;
