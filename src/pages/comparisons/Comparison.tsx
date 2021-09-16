import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { UsersService, Comparison, OpenAPI } from 'src/services/openapi';
import { catchAll_ensureVideoExistOrCreate } from 'src/utils/video';
import ComparisonSliders from 'src/features/comparisons/Comparison';
import VideoSelector from 'src/features/video_selector/VideoSelector';
import { selectLogin } from 'src/features/login/loginSlice';

import { useAppSelector } from '../../app/hooks';

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
  const token = useAppSelector(selectLogin);
  const classes = useStyles();
  const { videoA, videoB }: { videoA: string; videoB: string } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [initialComparison, setInitialComparison] = useState<Comparison | null>(
    null
  );
  const setVideoA = (x: string) =>
    history.push(`/comparison/${x}/${videoB || ''}`);
  const setVideoB = (x: string) => history.push(`/comparison/${videoA}/${x}`);

  useEffect(() => {
    catchAll_ensureVideoExistOrCreate(videoA);
  }, [videoA]);
  useEffect(() => {
    catchAll_ensureVideoExistOrCreate(videoB);
  }, [videoB]);
  useEffect(() => {
    setIsLoading(true);
    setInitialComparison(null);
    OpenAPI.TOKEN = token?.access_token ?? '';
    UsersService.usersMeComparisonsRetrieve(videoA, videoB)
      .then((comparison) => {
        console.log(comparison);
        setInitialComparison(comparison);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setInitialComparison(null);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoA, videoB]);

  const onSubmitComparison = (c: Comparison) => {
    if (initialComparison) {
      const { video_a, video_b, criteria_scores, duration_ms } = c;
      UsersService.usersMeComparisonsUpdate(
        video_a.video_id,
        video_b.video_id,
        { criteria_scores, duration_ms }
      );
    } else {
      UsersService.usersMeComparisonsCreate(c);
      setInitialComparison(c);
    }
  };

  return (
    <div className={`${classes.root} ${classes.centering}`}>
      <Grid container className={classes.content}>
        <Grid item xs={6}>
          <VideoSelector videoId={videoA} setId={setVideoA} />
        </Grid>
        <Grid item xs={6}>
          {videoA && <VideoSelector videoId={videoB} setId={setVideoB} />}
        </Grid>
        {videoA && videoB && (
          <Grid item xs={12} className={classes.centering}>
            {isLoading ? (
              <CircularProgress style={{ margin: 32 }} />
            ) : (
              <ComparisonSliders
                submit={onSubmitComparison}
                initialComparison={initialComparison}
              />
            )}
          </Grid>
        )}
      </Grid>
      {/* TODO add a link to a page explaning submitting comparison and the multiple criterias */}
      <a href="https://wiki.tournesol.app/">Help</a>
    </div>
  );
};

export default ComparisonsPage;
