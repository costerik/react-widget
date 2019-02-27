import React from 'react';

import { ReactComponent as TwitterLogo } from '../../assets/twitter.svg';

import './twitterCard.styles.scss';

const graphPictureUrl = 'http://graph.twitter.com/:id/picture';
const twitterHashtag = 'http://twitter.com/hashtag/:hash_tag';
const twitterProfile = 'http://www.twitter.com/profile.php?id=:id';
const twitterPostLink = 'http://twitter.com/:id/posts/:facebook_id';

const TwitterCard = (Component, cuid, cardData) => {
  return (
    <div className="twitter-card" key={cuid}>
      <Component
        {...cardData}
        profileUser={twitterProfile.replace(':id', cardData.avatarId)}
        profilePicture={graphPictureUrl.replace(':id', cardData.avatarId)}
        hashtag={twitterHashtag}
        linkToPost={twitterPostLink
          .replace(':id', cardData.avatarId)
          .replace(':twitter_id', cardData.twitterId)}
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
