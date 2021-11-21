import React from 'react';

import './Post.css';

export default function Post({
  description,
  imageUrl,
  user
}) {
  return (
    <div className="post">
      <div className="post-header">
        <UserBanner
          user={user}
        />
      </div>
      <div className="post-image-container">
        <img className="post-image" src={imageUrl} alt="user image"/>
      </div>
      <div className="post-description-container">
        <UserBanner
          user={user}
        />
        <p className="post-description">{description}</p>
      </div>
    </div>
  );
}

function UserBanner({
  user
}) {
  return ( <div className="user-banner">{user}</div> );
}