import React from 'react';

import { ReactComponent as FbLogo } from '../../assets/facebook.svg';

import './facebookCard.styles.scss';

const graphPictureUrl = 'http://graph.facebook.com/:id/picture';
const facebookHashtag = 'http://www.facebook.com/hashtag/:hash_tag';
const facebookProfile = 'http://www.facebook.com/profile.php?id=:id';
const facebookPostLink = 'http://facebook.com/:id/posts/:facebook_id';
// {{post.facebook_id.split('_')[1]}}

const FacebookCard = (Component, cuid, cardData) => {
  return (
    <div className="facebook-card" key={cuid}>
      <Component
        {...cardData}
        profileUser={facebookProfile.replace(':id', cardData.avatarId)}
        profilePicture={graphPictureUrl.replace(':id', cardData.avatarId)}
        hashtag={facebookHashtag}
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
