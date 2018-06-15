import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NotFound } from './views';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;


