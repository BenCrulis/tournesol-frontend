import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Comparison from '../../features/comparison/Comparison';
import Frame from '../../features/frame/Frame';
import VideoSelector from '../../features/video_selector/VideoSelector';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centered: {
    paddingBottom: '32px',
    width: '880px',
    flex: '0 0 auto',
    maxWidth: '100%',
  },
  videoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '16px',
  },
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '620px',
    alignItems: 'center',
    margin: '-2px',
  },
  slider: {
    flex: '1 1 0px',
  },
  formControl: {
    width: '128px',
  },
  featureNameDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    color: 'gray',
  },
  alertTop: {
    marginBottom: '15px',
  },
}));

const ComparisonsPage = () => {
  const classes = useStyles();
  const [videoA, setVideoA] = useState('A');
  const [videoB, setVideoB] = useState('B');

  return (
    <div className="ComparisonsPage">
      <Frame />
      <div className={classes.videoContainer}>
        <div id="video-left">
          <VideoSelector
            showPlayer
            showControls
            id={videoA}
            setId={setVideoA}
            getNewId={() => {}}
          />
        </div>
        <div id="video-right">
          <VideoSelector
            showPlayer
            showControls
            id={videoB}
            setId={setVideoB}
            getNewId={() => {}}
          />
        </div>
      </div>
      <Comparison videoA={videoA} videoB={videoB} />
    </div>
  );
};

export default ComparisonsPage;
