import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Activities from '../pages/Activities';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/activities/:candidate_id+" component={Activities} />
  </Switch>
);

export default Routes;
