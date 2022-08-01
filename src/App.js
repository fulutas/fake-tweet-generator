import React from 'react';
import './style.scss';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from './icons.js';

export default function App() {
  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
      </div>
      <div className="tweet-container">
        <div className="tweet">
          <div className="tweet-author">
            <img src="https://pbs.twimg.com/profile_images/1548325430934941698/2kCBjJBG_normal.jpg" />
            <div>
              <div className="name">
                Furkan Ulutaş
                <VerifiedIcon width="19" height="19" />
              </div>
              <div className="username">@furkanulutasx</div>
            </div>
          </div>
          <div className="tweet-content">
            <p>Bu tweet fake tweet generator uygulaması için atılmıştır :)</p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>24</b> Retweet
            </span>
            <span>
              <b>2</b> Alıntı Tweetler
            </span>
            <span>
              <b>24</b> Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
