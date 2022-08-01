import React, { useState } from 'react';
import './style.scss';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from './icons.js';

// 1 regex - @ işaretinden sonraki tüm karakterleri span etiketine ekler. gi tüm tweet içerisindeki bulduğu herşeye uygulaması için.

// 2 regex - # işaretinden a-z tüm harfler ve türkçe harflerde de uygulanması için kullanıldı.

// 3 regex - http ve https ile başlayan linklere uygular.

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/gi, '<span>@$1</span>')
    .replace(/#([\wşçöğüiıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/gi, '<span>$1</span>');
  return tweet;
};

export default function App() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <li>
            <input
              type="text"
              className="input"
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              className="input"
              placeholdeR="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <textarea
              className="textarea"
              maxLength="290"
              placeholder="Tweet"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="tweet">
          <div className="tweet-author">
            <img src="https://pbs.twimg.com/profile_images/1548325430934941698/2kCBjJBG_normal.jpg" />
            <div>
              <div className="name">
                {name || 'Ad Soyad'}
                {isVerified && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">@{username || 'kullaniciadi'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  'Bu alana örnek tweet eklenecek.',
              }}
            ></p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{retweets}</b> Retweet
            </span>
            <span>
              <b>{quoteTweets}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{likes}</b> Beğeni
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
