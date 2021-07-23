import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

window.is_authenticated = 1;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#336600',
    },
  },
});

const rootElement = document.createElement('div');
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  rootElement,
);
document.body.appendChild(rootElement);


