import React from 'react';
import ReactPlayer from 'react-player/youtube';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { getVideoIdFromURL } from './utils';

const useStyles = makeStyles(() => ({
  root: {
    margin: 4,
  },
  playerWrapper: {
    position: 'relative',
    aspectRatio: '16 / 9',
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  controls: {
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const VideoSelector = ({
  videoId,
  setId,
}: {
  videoId: string;
  setId: (pk: string) => void;
}) => {
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoId = getVideoIdFromURL(e.target.value);
    const _videoId = videoId
      ? videoId
      : e.target.value.replace(/[^A-Za-z0-9-_]/g, '').substring(0, 11);
    setId(_videoId);
  };

  // TODO: re-enable easily loading new video for rating
  // const loadNewVideo = (e: any) => {
  //   console.log('loadNewVideo');
  //   // TODO implement
  // };

  return (
    <div className={classes.root}>
      {videoId && (
        <div className={classes.playerWrapper}>
          <ReactPlayer
            url={`https://youtube.com/watch?v=${videoId}`}
            controls
            light
            width="100%"
            height="100%"
            className={classes.reactPlayer}
          />
        </div>
      )}
      <div className={classes.controls}>
        <TextField
          label="Video Id"
          placeholder="Paste URL or Video ID"
          style={{ flex: 1, minWidth: '10em' }}
          value={videoId}
          onChange={handleChange}
        />
        {/* TODO: re-enable easily loading new video for rating
        <Tooltip title="New Video" aria-label="new_video">
          <IconButton aria-label="new_video" onClick={loadNewVideo}>
            <ReplayIcon />
          </IconButton>
        </Tooltip> */}
        {/* TODO: re-enable privacy options <PrivacyStatusSelector id={id} /> */}
      </div>
    </div>
  );
};

export default VideoSelector;
