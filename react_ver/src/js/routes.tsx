import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Course from './components/Course';
import Layout from './components/Layout';

export const Path = {
  app: '/',
  otameshi: '/otameshi',
};

const routes = (
  <Layout>
    <Switch>
      <Route exact path={Path.app} component={Course} />
      <Redirect to={Path.app} />
    </Switch>
  </Layout>
);

export default routes;
