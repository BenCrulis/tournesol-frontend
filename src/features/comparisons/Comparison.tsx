import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import type { Comparison, ComparisonCriteriaScore } from 'src/services/openapi';

// TODO decide on proper way to handle these constants
const criteriaNames = {
  largely_recommended: 'Should be largely recommended',
  reliability: 'Reliable & not misleading',
  pedagogy: 'Clear & pedagogical',
  importance: 'Important and actionable',
  layman_friendly: 'Layman-friendly',
  entertaining_relaxing: 'Entertaining and relaxing',
  engaging: 'Engaging & thought-provoking',
  diversity_inclusion: 'Diversity & inclusion',
  better_habits: 'Encourages better habits',
  backfire_risk: 'Resilience to backfiring risks',
};

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
  criteriasContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 660,
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    flex: '1 1 0px',
  },
  formControl: {
    width: '128px',
  },
  criteriaNameDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTop: {
    marginBottom: '15px',
  },
}));

const ComparisonComponent = ({
  submit,
  initialComparison,
}: {
  submit: (c: Comparison) => void;
  initialComparison: Comparison | null;
}) => {
  const classes = useStyles();
  const { videoA, videoB }: { videoA: string; videoB: string } = useParams();
  const castToComparison = (c: Comparison | null): Comparison => {
    return c
      ? c
      : {
          video_a: { video_id: videoA },
          video_b: { video_id: videoB },
          criteria_scores: [],
        };
  };
  const [comparison, setComparison] = useState<Comparison>(
    castToComparison(initialComparison)
  );
  const [submitted, setSubmitted] = useState(false);

  type criteriaValuesType = { [s: string]: number | undefined };
  const criteriaValues: criteriaValuesType = comparison.criteria_scores.reduce(
    (
      acc: criteriaValuesType,
      cs: ComparisonCriteriaScore
    ): criteriaValuesType => {
      acc[cs.criteria] = cs.score || 0;
      return acc;
    },
    {}
  );

  useEffect(
    () => setComparison(castToComparison(initialComparison)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialComparison]
  );

  const submitComparison = () => {
    setSubmitted(true);
    submit(comparison);
  };

  const handleSliderChange = (criteria: string, score: number | undefined) => {
    console.log('slider change', criteria, score);
    const cs = comparison.criteria_scores.find((c) => c.criteria === criteria);
    if (score === undefined) {
      comparison.criteria_scores = comparison.criteria_scores.filter(
        (c) => c.criteria !== criteria
      );
    } else if (cs) {
      if (cs.score == score) return;
      cs.score = score;
    } else {
      comparison.criteria_scores.push({ criteria, score, weight: 1 });
    }
    setComparison({ ...comparison }); // this is only here to refresh the state
  };

  return (
    <div className={classes.root}>
      <div className={classes.centered}>
        {Object.entries(criteriaNames).map(([criteria, criteria_name]) => (
          <div
            key={criteria}
            id={`id_container_criteria_${criteria}`}
            className={classes.criteriasContainer}
          >
            <div className={classes.criteriaNameDisplay}>
              <Grid
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
                style={{ height: '20px' }}
              >
                {/* criteria NAME */}
                <Tooltip
                  title="Click to check our definition"
                  aria-label="criteria explanation"
                  interactive
                  style={{ marginLeft: '8px' }}
                  placement="left"
                >
                  <Typography>
                    <a
                      // TODO add correct link
                      href="https://wiki.tournesol.app"
                      id={`id_explanation_${criteria}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {criteria_name}
                    </a>
                  </Typography>
                </Tooltip>

                {/* SKIP criteria */}
                <Tooltip title="Vote on this criteria" aria-label="add">
                  <Checkbox
                    id={`id_checkbox_skip_${criteria}`}
                    disabled={submitted}
                    checked={criteriaValues[criteria] !== undefined}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSliderChange(
                        criteria,
                        e.target.checked ? 0 : undefined
                      )
                    }
                    name={criteria}
                    color="primary"
                  />
                </Tooltip>
              </Grid>
            </div>
            <div className={classes.sliderContainer}>
              <IconButton
                aria-label="left"
                onClick={() => handleSliderChange(criteria, -10)}
                style={{ color: 'black', transform: 'rotate(180deg)' }}
                disabled={submitted}
              >
                <DoubleArrowIcon />
              </IconButton>
              <Slider
                // ValueLabelComponent={ValueLabelComponent}
                id={`slider_expert_${criteria}`}
                aria-label="custom thumb label"
                color="secondary"
                min={-10}
                step={1}
                max={10}
                value={criteriaValues[criteria] || 0}
                className={classes.slider}
                track={false}
                disabled={submitted || criteriaValues[criteria] === undefined}
                onChange={(
                  _: React.ChangeEvent<unknown>,
                  score: number | number[]
                ) => handleSliderChange(criteria, score as number)}
              />
              <IconButton
                aria-label="right"
                onClick={() => handleSliderChange(criteria, 10)}
                style={{ color: 'black' }}
                disabled={submitted}
              >
                <DoubleArrowIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className={classes.criteriasContainer}>
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
            {submitted ? 'Edit comparison' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonComponent;
