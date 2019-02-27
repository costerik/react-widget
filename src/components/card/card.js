import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import './card.styles.scss';

const parseMessage = (message, hashtagUrl) => {
  const result = message.split(' ').map(element => {
    console.log(element);
    if (element.startsWith('#')) {
      return (
        <a
          className="hashtag"
          key={cuid()}
          href={hashtagUrl.replace(':hash_tag', element.toLowerCase().substr(1, element.length))}
        >
          <span style={{ color: 'blue' }}> {element} </span>
        </a>
      );
    }
    if (element.startsWith('http://') || element.startsWith('https://')) {
      return (
        <a key={cuid()} href={element}>
          <span style={{ color: 'blue' }}> {element} </span>
        </a>
      );
    }
    return <span key={cuid()}> {element} </span>;
  });

  return <p className="message">{result}</p>;
};

const parseDate = date => {
  const tempDate = date.split('T');
  return new Date(tempDate[0]).toDateString();
};

const Card = ({
  postDate,
  authorName,
  messageBody,
  avatarId,
  profilePicture,
  hashtag,
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
        {parseMessage(messageBody, hashtag)}
        <div className="card--content--wrapper-date">
          <a href={linkToPost} className="card--content--date">
            <p>{parseDate(postDate)}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  postDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  messageBody: PropTypes.string.isRequired,
  avatarId: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  hashtag: PropTypes.string.isRequired,
  profileUser: PropTypes.string.isRequired,
};

Card.defaultProps = {};

export default Card;
