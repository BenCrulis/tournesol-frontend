import React from 'react';

import {
  TextField,
  Grid,
  Container,
  makeStyles,
  Button,
  Theme,
} from '@material-ui/core';
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

const Comparisons = () => {
  const classes = useStyles();
  const comparisons = useAppSelector(selectComparisons);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectLogin);

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
    video_1: { video_id: 'A' },
    video_2: { video_id: 'B' },
    duration_ms: 0,
    datetime_lastedit: '2021-07-29T19:04:05.582637Z',
    datetime_add: '2021-07-29T19:04:05.582852Z',
    user: 1,
  };
  return (
    <div className="Comparisons">
      <Container className={classes.content} maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    dispatch(getComparisonsAsync(token?.access_token ?? ''))
                  }
                >
                  Fetch Comparisons
                </Button>
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    createComparison(token?.access_token ?? '', comparison);
                  }}
                >
                  Create Comparisons
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  value={JSON.stringify(comparisons.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Comparisons;
