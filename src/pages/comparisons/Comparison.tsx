import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Comparison from '../../features/comparisons/Comparison';
import VideoSelector from '../../features/video_selector/VideoSelector';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    // marginLeft: 64,
    paddingBottom: 32,
    paddingTop: 32,
    width: '880px',
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
  alertTop: {
    marginBottom: '15px',
  },
}));

const ComparisonsPage = () => {
  const classes = useStyles();
  const [videoA, setVideoA] = useState('Ok5sKLXqynQ');
  const [videoB, setVideoB] = useState('cebFWOlx848');

  return (
    <div className={classes.root}>
      <div className={classes.centered}>
        <Grid container className={classes.content}>
          <Grid item xs={6}>
            <VideoSelector videoId={videoA} setId={setVideoA} />
          </Grid>
          <Grid item xs={6}>
            <VideoSelector videoId={videoB} setId={setVideoB} />
          </Grid>
          <Grid item xs={12}>
            <Comparison videoA={videoA} videoB={videoB} />
          </Grid>
        </Grid>
      </div>
      {/* TODO add a link to a page explaning submitting comparison and the multiple criterias */}
      <a href="https://wiki.tournesol.app/">Help</a>
    </div>
  );
};

export default ComparisonsPage;
