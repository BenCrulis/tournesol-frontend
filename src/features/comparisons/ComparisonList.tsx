import React, { useState, useEffect } from 'react';

import {
  TextField,
  Grid,
  Container,
  makeStyles,
  Button,
  Theme,
} from '@material-ui/core';

import type { Comparison } from 'src/services/openapi/models/Comparison';

import { fetchComparisons } from './comparisonsAPI';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getComparisonsAsync, selectComparisons } from './comparisonsSlice';
import { createComparison } from './comparisonsAPI';
import { selectLogin } from '../login/loginSlice';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: '64px',
    padding: theme.spacing(3),
  },
}));

const ComparisonThumbnail = ({ comparison }: { comparison: Comparison }) => {
  console.log(comparison);
  return (
    <div>
      <p>{`${comparison.video_a.video_id}${comparison.video_b.video_id}`}</p>
    </div>
  );
};

const Comparisons = () => {
  const classes = useStyles();
  const comparisons = useAppSelector(selectComparisons);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectLogin);
  const [comparisonList, setComparisonList]: [
    Comparison[] | undefined,
    (l: Comparison[] | undefined) => void
  ] = useState();

  useEffect(() => {
    if (comparisonList == undefined) {
      fetchComparisons(token?.access_token ?? '').then((data) => {
        setComparisonList(data.results);
      });
    }
  }, []); // Runs only once

  const comparison = {
    criteria_scores: [
      {
        criteria: 'reliable',
        score: 100,
        weight: 1,
        comparison: 1,
      },
      { criteria: 'pedagogical', score: 100, weight: 1, comparison: 1 },
    ],
    video_a: { video_id: 'Ok5sKLXqynQ' },
    video_b: { video_id: 'cebFWOlx848' },
    duration_ms: 0,
    datetime_lastedit: '2021-07-29T19:04:05.582637Z',
    datetime_add: '2021-07-29T19:04:05.582852Z',
    user: 1,
  };
  return (
    <Container className={classes.content} maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {comparisonList &&
            comparisonList.map((c) => (
              <ComparisonThumbnail
                key={`${c.video_a.video_id}${c.video_b.video_id}`}
                comparison={c}
              />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Comparisons;
