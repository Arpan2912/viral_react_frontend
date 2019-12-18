import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Person from './pages/Person/Person';
import Rough from './pages/Rough/Rough';
const Routes = () => {
    return (
        <Switch>
            <Route key='home' exact={true} path={'/home'} component={Dashboard} />
            <Route key='person' exact={true} path={'/person'} component={Person} />
            <Route key='rough' exact={true} path={'/rough'} component={Rough} />
            {/* if user enter wrong path redirect to home page */}
            <Redirect from="*" to="/" />
        </Switch>
    );
}
export default Routes;
