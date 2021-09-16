import React from 'react';
import ReactPlayer from 'react-player/youtube';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/Comment';
import PublicIcon from '@material-ui/icons/Public';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fade';

import { getVideoIdFromURL, VideoPlayer } from './utils';

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

  const handleChange = (e: any) => {
    console.log('handleChange');
    // TODO implement
    // const target = e.target;
    // const videoId = getVideoIdFromURL(target?.value);
    // if (videoId) setId(videoId);
    // else setId(target?.value.replace(/[^A-Za-z0-9-_]/g, '').substring(0, 20));
  };

  const loadNewVideo = (e: any) => {
    console.log('loadNewVideo');
    // TODO implement
  };

  return (
    <div className={classes.root}>
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
      <div className={classes.controls}>
        <TextField
          label="Video Id"
          placeholder="Paste URL or Video ID"
          style={{ flex: 1, minWidth: '10em' }}
          value={videoId}
          onChange={handleChange}
        />
        <Tooltip title="New Video" aria-label="new_video">
          <IconButton aria-label="new_video" onClick={loadNewVideo}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
        {/* TODO: re-enable privacy options <PrivacyStatusSelector id={id} /> */}
      </div>
    </div>
  );
};

export default VideoSelector;
