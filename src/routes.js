import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';

export const AppRouter = () => <Router>
  <Switch>
    <Route exact path='/' component={HomePage} />
  </Switch>
</Router>

export default AppRouter