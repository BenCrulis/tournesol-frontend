import React from 'react';
import ReactPlayer from 'react-player/youtube';

// Function found on Stackoverflow. At:
// https://stackoverflow.com/questions/42202611/how-to-validate-a-youtube-url-using-js
export const getVideoIdFromURL = (url: string) => {
  if (typeof url !== 'string') return '';
  const a = document.createElement('A');
  // TODO figure out why typescript needs me to do this
  if (!(a instanceof HTMLAnchorElement)) {
    throw 'This error should not happen?';
  }
  a.href = url;
  const host = a.hostname;
  const srch = a.search;
  const path = a.pathname;
  let returnValue = '';
  const regexpSymbol = '[A-Za-z0-9-_]';
  let notRegexpSymbol = '';

  if (
    regexpSymbol[0] === '[' &&
    regexpSymbol[regexpSymbol.length - 1] === ']'
  ) {
    notRegexpSymbol = `[^${regexpSymbol.slice(1, regexpSymbol.length - 1)}]`;
  }

  if (host.search(/youtube\.com|youtu\.be/) === -1) return false;
  if (host.search(/youtu\.be/) !== -1) {
    returnValue = path.slice(1);
  } else if (path.search(/embed/) !== -1) {
    const regexp = new RegExp(`embed/(${regexpSymbol}+)(&|$)`);
    // TODO should there be better error handling than returning ''
    const tmp = regexp.exec(path);
    returnValue = tmp ? tmp[1] : '';
  } else {
    const regexp = new RegExp(`v=(${regexpSymbol}+)(&|$)`);
    const getId = regexp.exec(srch);
    if (host.search(/youtube\.com/) !== -1) {
      returnValue = !getId ? '' : getId[1];
    }
  }
  const regexp1 = new RegExp(notRegexpSymbol, 'g');
  returnValue = returnValue.replace(regexp1, '');
  returnValue = returnValue.substring(0, 20);
  return returnValue;
};

// show the appropriate player
export const VideoPlayer = ({
  videoId,
  width = 250,
  height = 142,
}: {
  videoId: string;
  width: number;
  height: number;
}) => {
  return (
    <ReactPlayer
      url={`https://youtube.com/watch?v=${videoId}`}
      controls
      light
      width={width}
      height={height}
      // TODO figure out config type with typescript
      // config={{
      //   youtube: {
      //     playerVars: { autoplay: 0 },
      //   },
      // }}
    />
  );
};
