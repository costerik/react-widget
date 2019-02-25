import React from 'react';
import PropTypes from 'prop-types';
import './card.styles.scss';

const Card = ({ postDate, authorName, messageBody }) => (
  <div className="Card">
    {postDate}
    {authorName}
    {messageBody}
  </div>
);

Card.propTypes = {
  postDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  messageBody: PropTypes.string.isRequired,
};

export default Card;
