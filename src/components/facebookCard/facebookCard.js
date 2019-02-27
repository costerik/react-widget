import React from 'react';
import cuid from 'cuid';

import { ReactComponent as FbLogo } from '../../assets/facebook.svg';

import './facebookCard.styles.scss';

const graphPictureUrl = 'http://graph.facebook.com/:id/picture';
const facebookHashtag = 'http://www.facebook.com/hashtag/:hash_tag';
const facebookProfile = 'http://www.facebook.com/profile.php?id=:id';
const facebookPostLink = 'http://facebook.com/:id/posts/:facebook_id';

const parseMessage = (message, hashtagUrl) => {
  const result = message.split(' ').map(element => {
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

const FacebookCard = (Component, cuid, cardData) => {
  return (
    <div className="facebook-card" key={cuid}>
      <Component
        authorName={cardData.authorName}
        profileUser={facebookProfile.replace(':id', cardData.avatarId)}
        profilePicture={graphPictureUrl.replace(':id', cardData.avatarId)}
        messageBody={parseMessage(cardData.messageBody, facebookHashtag)}
        postDate={parseDate(cardData.postDate)}
        linkToPost={facebookPostLink
          .replace(':id', cardData.avatarId)
          .replace(':facebook_id', cardData.facebookId)}
      >
        {() => (
          <div className="wrapper-facebook-logo">
            <FbLogo className="facebook-logo" width={20} height={20} />
          </div>
        )}
      </Component>
    </div>
  );
};

export default FacebookCard;
