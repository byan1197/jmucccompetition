import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Judge from './Judge';
import Admin from './Admin';
import ScoreSheet from './ScoreSheet';
import JudgeDivisions from './JudgeDivisions';
import RankingSheet from './RankingSheet';

const RouteList = () => {
    return (<Switch>
        <Route path='/' exact component={Judge} />
        <Route path='/admin' exact component={Admin} />
        <Route path='/score' exact component={ScoreSheet} />
        <Route path='/divisions' exact component={JudgeDivisions} />
        <Route path='/rank' exact component={RankingSheet} />
    </Switch>)
}

export default RouteList;