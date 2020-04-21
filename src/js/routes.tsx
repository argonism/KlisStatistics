import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Course from './components/Course';
import Layout from './components/Layout';
import HowToUse from './components/HowToUse';

export const Path =
  process.env.NODE_ENV === 'production'
    ? {
        home: '/KlisStatistics/',
        howto: '/KlisStatistics/How_to_use',
      }
    : {
        home: '/',
        howto: '/How_to_use',
      };

const routes = (
  <Layout>
    <Switch>
      <Route exact path={Path.home} component={Course} />
      <Route exact path={Path.howto} component={HowToUse} />
      <Redirect to={Path.home} />
    </Switch>
  </Layout>
);

export default routes;
