import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NotFound } from './views';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/smoothie" component={Home} />
            <Route exact path="/smoothie/:id" component={Home} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;


