import React from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import {
  FormControlLabel,
  makeStyles,
  Typography,
  Checkbox,
} from '@material-ui/core';
import { Collapse, IconButton } from '@material-ui/core';
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
    marginLeft: '8px',
  },
  collapse: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
}));

function SearchFilter() {
  const history = useHistory();
  const paramsString = useLocation().search;
  const searchParams = new URLSearchParams(paramsString);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dateChoices = ['Any', 'Today', 'Week', 'Month', 'Year'];
  const languageChoices = {
    en: 'English',
    fr: 'French',
    de: 'German',
  };
  const date = searchParams.get('date') || 'Any';
  const language = searchParams.get('language') || '';

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pushNewURL('date', event.target.name);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pushNewURL('language', event.target.name);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function pushNewURL(key: string, value: string) {
    const searchParams = new URLSearchParams(paramsString);
    searchParams.delete(key);
    searchParams.append(key, value);
    history.push('/recommendations/?' + searchParams.toString());
  }

  return (
    <div className="main">
      <IconButton
        className="second"
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        {!expanded ? <ExpandMore /> : <ExpandLess />}
        <p className={classes.filter}>FILTERS</p>
      </IconButton>
      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <div className="data uploaded">
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
        <div className="language">
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
      </Collapse>
    </div>
  );
}

export default SearchFilter;
