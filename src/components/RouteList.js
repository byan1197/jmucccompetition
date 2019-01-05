import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Judge from './Judge';
import Admin from './Admin';
import ScoreSheet from './ScoreSheet';

const RouteList = () => {
    return (<Switch>
        <Route path='/' exact component={Judge} />
        <Route path='/admin' exact component={Admin} />
        <Route path='/score' exact component={ScoreSheet} />
    </Switch>)
}

export default RouteList;