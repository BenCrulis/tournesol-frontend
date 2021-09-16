import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Comparison from '../../features/comparisons/Comparison';
import VideoSelector from '../../features/video_selector/VideoSelector';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  centering: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
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
  const { videoA, videoB }: { videoA: string; videoB: string } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const setVideoA = (x: string) => history.push(`/comparison/${x}/${videoB}`);
  const setVideoB = (x: string) => history.push(`/comparison/${videoA}/${x}`);

  useEffect(() => {
    setIsLoading(true);
  }, [videoA, videoB]);

  return (
    <div className={`${classes.root} ${classes.centering}`}>
      <Grid container className={classes.content}>
        <Grid item xs={6}>
          <VideoSelector videoId={videoA} setId={setVideoA} />
        </Grid>
        <Grid item xs={6}>
          {videoA && <VideoSelector videoId={videoB} setId={setVideoB} />}
        </Grid>
        <Grid item xs={12} className={classes.centering}>
          {isLoading ? (
            <CircularProgress style={{ margin: 32 }} />
          ) : (
            <Comparison videoA={videoA} videoB={videoB} />
          )}
        </Grid>
      </Grid>
      {/* TODO add a link to a page explaning submitting comparison and the multiple criterias */}
      <a href="https://wiki.tournesol.app/">Help</a>
    </div>
  );
};

export default ComparisonsPage;
