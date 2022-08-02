import React, { useState, createRef, useEffect } from 'react';
import './style.scss';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from './icons.js';

import { AvatarLoader } from './loaders';
import { useScreenshot } from 'use-react-screenshot';
import { language } from './language';

// Twitter'dan gelen profil fotoğrafı base64 formatına çevirir.
function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

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

const formatNumber = (number) => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }

  number /= 1000;
  number = String(number).split('.');
  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B')
  );
};

export default function App() {
  const tweetRef = createRef(null); // Tweet div
  const downloadRef = createRef(); // Tweet indir a tag

  const [name, setName] = useState();
  const [username, setUsername] = useState('furkanulutasx');
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [lang, setLang] = useState('tr');
  const [langText, setLangText] = useState();
  const [image, takeScreenshot] = useScreenshot();

  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  useEffect(() => {
    if (image) {
      downloadRef.current.click(); // Oluştur tıklandığında otomatik görüntüyü indirir.
    }
  }, [image]);

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      setAvatar(this.result);
    });

    reader.readAsDataURL(file);
  };

  const fetchTwitterInfo = () => {
    fetch(
      `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        const twitter = data[0];
        console.log(twitter);

        if (!twitter) {
          console.log('not found profile');
        }

        // Profile image
        convertImgToBase64(
          twitter.profile_image_url_https,
          function (base64Image) {
            setAvatar(base64Image);
          }
        );

        setName(twitter.name);
        setUsername(twitter.screen_name);
        setTweet(twitter.status.text);
        setRetweets(twitter.status.retweet_count);
        setLikes(twitter.status.favorite_count);
      })
      .catch((error) => {
        if (error == {} || []) {
          alert('Not found twitter profile.');
        }
      });
  };

  return (
    <>
      <div className="tweet-settings">
        <h3>{langText?.settings}</h3>
        <ul>
          <li>
            <label>{langText?.name}</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.username}</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              className="textarea"
              maxLength="290"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              type="file"
              className="input"
              onChange={avatarHandle}
            />
          </li>
          <li>
            <label>Retweets</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.quoteTweets}</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.likes}</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.verifiedAccount}</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              {langText?.option.map((data) => (
                <option value={data.id}>{data.text}</option>
              ))}
            </select>
          </li>

          <button onClick={getImage}>{langText?.create}</button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                Tweeti İndir
              </a>
            )}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="app-language">
          <span
            onClick={() => setLang('tr')}
            className={lang === 'tr' && 'active'}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLang('en')}
            className={lang === 'en' && 'active'}
          >
            English
          </span>
        </div>
        <div className="fetch-info">
          <input
            type="text"
            placeholder={langText?.usernamePlaceHolder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchTwitterInfo}>{langText?.search}</button>
        </div>
        <p className="not-found">{}</p>
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <AvatarLoader />}
            <div>
              <div className="name">
                {name || langText?.name}
                {isVerified == 1 && <VerifiedIcon width="19" height="19" />}
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
              <b>{formatNumber(retweets)}</b> {langText?.retweets}
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> {langText?.quoteTweets}
            </span>
            <span>
              <b>{formatNumber(likes)}</b> {langText?.likes}
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
