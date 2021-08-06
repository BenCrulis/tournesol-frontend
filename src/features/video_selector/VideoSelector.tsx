import React from 'react';

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
import { withStyles } from '@material-ui/core/styles';

import { getVideoIdFromURL, VideoPlayer } from './utils';

export default ({
  id,
  setId,
  getNewId,
  showPlayer = true,
  showControls = true,
}: {
  id: string;
  setId: Function;
  getNewId: Function;
  showPlayer: boolean;
  showControls: boolean;
}) => {
  const handleChange = (e: any) => {
    console.log('handleChange');
    // TODO implement
    // const target = e.target;
    // const videoId = getVideoIdFromURL(target?.value);
    // if (videoId) setId(videoId);
    // else setId(target?.value.replace(/[^A-Za-z0-9-_]/g, '').substring(0, 20));
  };

  return (
    <div>
      {showPlayer && (
        <div
          style={{
            height: '238px',
            width: '420px',
            background: '#000',
          }}
        >
          <VideoPlayer videoId={id} width={420} height={240} />
        </div>
      )}
      {showControls && (
        <div style={{ marginTop: '12px' }}>
          <TextField
            label="Video Id"
            variant="outlined"
            className="video_id_text_field"
            placeholder="Paste URL or Video ID"
            style={{ width: '13em' }}
            value={id}
            onChange={handleChange}
          />
          <Tooltip title="New Video" aria-label="add">
            <IconButton
              className="new_video_button"
              aria-label="load"
              onClick={() => getNewId()}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          {/* <PrivacyStatusSelector id={id} /> */}
        </div>
      )}
    </div>
  );
};
