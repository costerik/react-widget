import React from 'react';
import cuid from 'cuid';

import { ReactComponent as TwitterLogo } from '../../assets/twitter.svg';

import './twitterCard.styles.scss';

const twitterHashtag = 'http://twitter.com/hashtag/:hash_tag';
const twitterProfile = 'http://twitter.com/:screen_name';
const twitterPostLink = 'https://twitter.com/:screen_name/status/:id_str';

const parseMessage = (message, mentions) => {
  const result = message.split(' ').map(element => {
    if (element.startsWith('@')) {
      const res = mentions.filter(mention => {
        return element
          .substr(1, element.length)
          .toLowerCase()
          .includes(mention.screen_name.toLowerCase());
      });
      return (
        <a
          className="hashtag"
          key={cuid()}
          href={twitterProfile.replace(':screen_name', res[0] && res[0].screen_name)}
        >
          <span style={{ color: 'blue' }}> {element} </span>
        </a>
      );
    }
    if (element.startsWith('#')) {
      return (
        <a
          className="hashtag"
          key={cuid()}
          href={twitterHashtag.replace(
            ':hash_tag',
            element.toLowerCase().substr(1, element.length)
          )}
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
  return new Date(date).toDateString();
};

const TwitterCard = (Component, cuid, cardData) => {
  return (
    <div className="twitter-card" key={cuid}>
      <Component
        authorName={cardData.authorName}
        profileUser={twitterProfile.replace(':screen_name', cardData.screenName)}
        profilePicture={cardData.profileImage}
        messageBody={parseMessage(cardData.messageBody, cardData.entities.user_mentions)}
        postDate={parseDate(cardData.postDate)}
        linkToPost={twitterPostLink
          .replace(':screen_name', cardData.screenName)
          .replace(':id_str', cardData.idStr)}
      >
        {() => (
          <div className="wrapper-twitter-logo">
            <TwitterLogo className="twitter-logo" width={20} height={20} />
          </div>
        )}
      </Component>
    </div>
  );
};

export default TwitterCard;
