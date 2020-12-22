import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import NewCandidate from '../pages/NewCandidate';
import FindCandidates from '../pages/FindCandidates';

import Activities from '../pages/Activities';
import NewActivity from '../pages/NewActivity';
import EditActivity from '../pages/EditActivity';
import EditCandidate from '../pages/EditCandidate';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/new-candidate" component={NewCandidate} />
    <Route path="/find-candidates" component={FindCandidates} />

    <Route path="/activities/:candidate_id+" component={Activities} />
    <Route path="/new-activity/:candidate_id+" component={NewActivity} />
    <Route path="/edit-activity/:activity_id+" component={EditActivity} />

    <Route path="/edit-candidate/:candidate_id+" component={EditCandidate} />
  </Switch>
);

export default Routes;
