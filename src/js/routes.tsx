import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Course from './components/Course';
import Layout from './components/Layout';

export const Path = {
  home: '/',
  otameshi: '/otameshi',
};

const routes = (
  <Layout>
    <Switch>
      <Route exact path={Path.home} component={Course} />
      <Redirect to={Path.home} />
    </Switch>
  </Layout>
);

export default routes;
