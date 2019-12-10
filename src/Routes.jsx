import React from 'react';
import { Switch, Redirect,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
const Routes = () => {
    return (
        <Switch>
            <Route key='home' exact={true} path={'/home'} component={Dashboard} />
            {/* if user enter wrong path redirect to home page */}
            <Redirect from="*" to="/" />
        </Switch>
    );
}
export default Routes;
