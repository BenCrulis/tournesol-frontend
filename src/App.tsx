import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/Home';
import LoginPage from './pages/login/Login';
import ComparisonsPage from './pages/comparisons/Comparisons';
import DonatePage from './pages/donate/Donate';
import RateLaterPage from './pages/rateLater/RateLater';
import Frame from './features/frame/Frame';
import ComparisonPage from './pages/comparison/Comparison';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './features/login/PrivateRoute';
import VideoCardPage from './pages/videos/VideoCard';

function App() {
  return (
    <div className="App">
      <Frame>
        <Switch>
          <Route path="/video/:video_id">
            <VideoCardPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/comparisons">
            <ComparisonsPage />
          </PrivateRoute>
          <PrivateRoute path="/comparison">
            <ComparisonPage />
          </PrivateRoute>
          <PrivateRoute path="/rate_later">
            <RateLaterPage />
          </PrivateRoute>
          <Route path="/donate">
            <DonatePage />
          </Route>
          <Route path="/signup">
            <p>TODO: sign-up page</p>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Frame>
    </div>
  );
}

export default App;
