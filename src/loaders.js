import React from 'react';
import ContentLoader from 'react-content-loader';

const AvatarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={60}
    height={48}
    viewBox="0 0 60 48"
    backgroundColor="#333"
    foregroundColor="#444"
    {...props}
  >
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export { AvatarLoader };
