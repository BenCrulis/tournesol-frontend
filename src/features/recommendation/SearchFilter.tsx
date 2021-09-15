import React from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import {
  FormControlLabel,
  makeStyles,
  Typography,
  Checkbox,
  Collapse,
  Button,
  Grid,
  Slider,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import {
  CheckCircle,
  CheckCircleOutline,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  main: {
    margin: 4,
  },
  filter: {
    color: '#506AD4',
    margin: '8px',
  },
  collapse: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
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
  featureNameDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  criteria_img: {
    marginRight: 4,
  },
  other_parameters: {
    padding: 4,
  },
  valueText: {
    margin: 4,
  },
}));

const CustomSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  active: {},
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

function SearchFilter() {
  const history = useHistory();
  const paramsString = useLocation().search;
  const searchParams = new URLSearchParams(paramsString);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dateChoices = ['Today', 'Week', 'Month', 'Year'];
  const languageChoices = {
    en: 'English',
    fr: 'French',
    de: 'German',
  };
  const date = searchParams.get('date') || 'Any';
  const language = searchParams.get('language') || '';

  const marks = [
    {
      value: 0,
    },
    {
      value: 25,
    },
    {
      value: 50,
    },
    {
      value: 75,
    },
    {
      value: 100,
    },
  ];

  const featureNames = {
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pushNewURL('date', event.target.name);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pushNewURL('language', event.target.name);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function valuetoText(value: number) {
    if (value == 0) {
      return 'Ignore';
    } else if (value == 25) {
      return 'Not important';
    } else if (value == 50) {
      return 'Neutral';
    } else if (value == 75) {
      return 'Important';
    } else {
      return 'Crucial';
    }
  }

  function pushNewURL(key: string, value: string) {
    const searchParams = new URLSearchParams(paramsString);
    if (searchParams.get(key) === value) {
      searchParams.delete(key);
    } else {
      searchParams.delete(key);
      searchParams.append(key, value);
    }
    history.push('/recommendations/?' + searchParams.toString());
  }

  interface Props {
    children: React.ReactElement;
    open: boolean;
    value: number;
  }

  function ValueLabelComponent(props: Props) {
    const { children, open, value } = props;
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  return (
    <div className="main">
      <div className="filters">
        <Button
          color="secondary"
          size="large"
          className={classes.filter}
          startIcon={!expanded ? <ExpandMore /> : <ExpandLess />}
          aria-expanded={expanded}
          aria-label="show more"
          onClick={handleExpandClick}
        >
          Filters
        </Button>
        <Collapse
          className={classes.collapse}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <div className="parameters">
            <div className="criteria">
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
                      style={{ height: '30px' }}
                    >
                      <img
                        className={classes.criteria_img}
                        src={`/svg/${feature}.svg`}
                      />
                      <Typography>
                        <span>{feature_name}</span>
                      </Typography>
                    </Grid>
                  </div>
                  <div className={classes.sliderContainer}>
                    <Grid
                      item
                      xs={6}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      container
                    >
                      <span className={classes.valueText}>
                        {valuetoText(
                          parseInt(searchParams.get(feature) || '50')
                        )}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      container
                    >
                      <CustomSlider
                        name={feature}
                        defaultValue={parseInt(
                          searchParams.get(feature) || '50'
                        )}
                        step={25}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valuetoText}
                        onChangeCommitted={(e, value) =>
                          pushNewURL(feature, value.toString())
                        }
                        ValueLabelComponent={ValueLabelComponent}
                        marks={marks}
                      />
                    </Grid>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.other_parameters}>
              <Typography variant="h5" component="h2">
                Date Uploaded
              </Typography>
              {dateChoices.map((label) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle />}
                      checked={date == label}
                      onChange={handleDateChange}
                      name={label}
                    />
                  }
                  label={label}
                  key={label}
                />
              ))}
            </div>
            <div className={classes.other_parameters}>
              <Typography variant="h5" component="h2">
                Language
              </Typography>
              {Object.entries(languageChoices).map(
                ([language_key, language_value]) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckCircleOutline />}
                        checkedIcon={<CheckCircle />}
                        checked={language == language_key}
                        onChange={handleLanguageChange}
                        name={language_key}
                      />
                    }
                    label={language_value}
                    key={language_key}
                  />
                )
              )}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default SearchFilter;
