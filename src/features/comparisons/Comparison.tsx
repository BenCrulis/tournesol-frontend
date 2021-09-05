import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Rating from '@material-ui/lab/Rating';

import type { Comparison } from '../../services/openapi';

// TODO decide on proper way to handle these constants
const featureNames = {
  reliable: 'Accurate and reliable',
  pedagogical: 'Clear and pedagogical',
  important: 'Important and actionable',
};
const featureList = Object.keys(featureNames);

const defaultComparison = 0;
const defaultWeidht = 1;

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
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 'calc(100% - 64px)',
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

const isIdValid = (videoId: string) => {
  const notNull = videoId !== null;
  const notDots = videoId !== '...';
  const notUndefined = videoId !== undefined;
  return notNull && notDots && notUndefined && videoId;
};

const ComparisonComponent = ({
  videoA,
  videoB,
}: {
  videoA: string;
  videoB: string;
}) => {
  const classes = useStyles();

  const [comparison, setComparison] = useState({
    video_1: { video_id: videoA },
    video_2: { video_id: videoB },
    criteria_scores: [],
  });
  const [weights, setWeights] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const updateOrCreateComparison = () => {
    // TODO implement
    console.log('updateOrCreateComparison');
  };

  const submitComparison = () => {
    // TODO implement
    console.log('submitComparison');
  };

  if (!isIdValid(videoA) || !isIdValid(videoB)) {
    return <div>Incorrect ids to use component</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.centered}>
        {Object.entries(featureNames).map(([feature, feature_name]) => (
          <div
            key={feature}
            id={`id_container_feature_${feature}`}
            className={classes.featuresContainer}
          >
            <div className={classes.featureNameDisplay}>
              <Grid
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
                style={{ height: '20px' }}
              >
                {/* FEATURE NAME */}
                <Tooltip
                  title="Click to check our definition"
                  aria-label="feature explanation"
                  interactive
                  style={{ marginLeft: '8px' }}
                  placement="left"
                >
                  <Typography>
                    <a
                      // TODO add correct link
                      href="https://wiki.tournesol.app"
                      id={`id_explanation_${feature}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {feature_name}
                    </a>
                  </Typography>
                </Tooltip>

                {/* SKIP FEATURE */}
                <Tooltip title="Skip this feature" aria-label="add">
                  <Checkbox
                    id={`id_checkbox_skip_${feature}`}
                    disabled={submitted}
                    checked={false}
                    onChange={(e) => {
                      // TODO
                      console.log('Checkbox onChange');
                    }}
                    name={feature}
                    color="primary"
                  />
                </Tooltip>
              </Grid>
            </div>
            <div className={classes.sliderContainer}>
              <IconButton
                aria-label="left"
                onClick={() => {
                  setComparison({ ...comparison, [feature]: 0 });
                }}
                style={{ color: 'black', transform: 'rotate(180deg)' }}
                disabled={submitted}
              >
                <DoubleArrowIcon />
              </IconButton>
              <Slider
                // ValueLabelComponent={ValueLabelComponent}
                id={`slider_expert_${feature}`}
                aria-label="custom thumb label"
                color="secondary"
                // TODO add correct value
                value={42}
                className={classes.slider}
                track={false}
                disabled={submitted}
                onChange={(e, value) => {
                  // TODO: correctly update comparison
                  console.log('Slider onChange');
                }}
              />
              <IconButton
                aria-label="right"
                onClick={() => {
                  setComparison({ ...comparison, [feature]: 100 });
                }}
                style={{ color: 'black' }}
                disabled={submitted}
              >
                <DoubleArrowIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className={classes.featuresContainer}>
          {submitted && (
            <div id="id_submitted_text_info">
              <Typography>
                Change one of the video to submit a new comparison
              </Typography>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            id="expert_submit_btn"
            onClick={submitted ? () => setSubmitted(false) : submitComparison}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonComponent;
