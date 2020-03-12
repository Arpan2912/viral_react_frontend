import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import { hotkeys } from 'react-keyboard-shortcuts'

import PrivateRoute from '../components/PrivateRoutes';
import { publicRouteObj, privateRouteObj } from './router-config';
// import PrivateRoute from '../component/private-route/PrivateRoute';


let privateRoutes = privateRouteObj;

class Routes extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("Router config", nextProps);
        // privateRoutes = privateRouteObj.filter(route => {
        //     return true;
        // })
    }

    hot_keys = {
        'ctrl+a': { // combo from mousetrap
            priority: 1,
            handler: (event) => {
                event.preventDefault();
                console.log(this.props);
                this.props.history.push('/start-end-lot-history')
            }
        },
        'ctrl+e': { // combo from mousetrap
            priority: 1,
            handler: (event) => {
                event.preventDefault();
                console.log(this.props);
                this.props.history.push('/end-lot-history')
            }
        },
        'ctrl+s': { // combo from mousetrap
            priority: 1,
            handler: (event) => {
                event.preventDefault();
                console.log(this.props);
                this.props.history.push('/add-lot-history')
            }
        },
    }

    render() {
        const publicRoutesObj = publicRouteObj.map(route => (
            <Route key={route.key} exact={route.exact} path={route.path} component={route.component} />
        ));

        const privateRoutesObj = privateRoutes.map(route => (
            <PrivateRoute
                key={route.key}
                exact={route.exact}
                path={route.path}
                component={route.component}
            />
        ));
        return (
            <Switch>
                {publicRoutesObj}
                {privateRoutesObj}
                {/* if user enter wrong path redirect to home page */}
                <Redirect from="*" to="/" />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    route: state.routeReducer
})

// export default connect(mapStateToProps, null)(Routes);
export default (withRouter(hotkeys(Routes)));
