import React from 'react';
import {Switch,Route} from 'react-router-dom';
import movies from './movies';
import ticketboxoffice from './ticketboxoffice';

import headers from './header';
const Main = () => (
    <Switch>
        <Route exact path = '/movies' component={movies}/>
        <Route exact path = '/' component={headers}/>
        <Route exact path = '/transaction/ticketboxoffice' component={ticketboxoffice} />
    </Switch>
)

export default Main;