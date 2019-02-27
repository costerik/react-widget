import React from 'react';
import PropTypes from 'prop-types';
import './card.styles.scss';

const Card = ({
  postDate,
  authorName,
  messageBody,
  profilePicture,
  profileUser,
  linkToPost,
  children,
}) => (
  <div className="card">
    {children()}
    <div className="card--wrapper-author">
      <span>
        <img src={profilePicture} alt="profile" />
      </span>
      <a className="card--wrapper-author--name" href={profileUser}>
        <p>{authorName}</p>
      </a>
    </div>
    <div className="card--content">
      <div className="card--content--message-container">
        {messageBody}
        <div className="card--content--wrapper-date">
          <a href={linkToPost} className="card--content--date">
            <p>{postDate}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  postDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  messageBody: PropTypes.element.isRequired,
  profilePicture: PropTypes.string.isRequired,
  profileUser: PropTypes.string.isRequired,
  linkToPost: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

Card.defaultProps = {};

export default Card;
