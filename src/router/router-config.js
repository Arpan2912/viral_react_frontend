// import { Home, About, Login, Logout, Users, Product, ForgotPassword, Exchanges, PaymentHistory } from '../containers';
// import Loadable from 'react-loadable';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Person from '../pages/Person/Person';
import Rough from '../pages/Rough/Rough';
import StoneStatus from '../pages/StoneStatus/StoneStatus';
import LotHistory from '../pages/LotHistory/LotHistory';
import AddLotHistory from '../pages/AddLotHistory/AddLotHistory';
// Lazy loading sample code
// const Home = Loadable({
//   loader: () => import(/* webpackChunkName: "home" */ '../containers/Home'),
//   loading: () => <div>Loading...</div>,
// });


export const publicRouteObj = [
  {
    exact: true,
    path: '/',
    component: Login,
    key: 'Login',
  },
  {
    exact: true,
    path: '/logout',
    component: Logout,
    key: 'Logout',
  },
];

export const privateRouteObj = [
  {
    exact: true,
    path: '/home',
    component: Dashboard,
    key: 'Dashboard',
  },
  {
    exact: true,
    path: '/rough',
    component: Rough,
    key: 'Rough',
  },
  {
    exact: true,
    path: '/person',
    component: Person,
    key: 'Person',
  },
  {
    exact: true,
    path: '/stones',
    component: StoneStatus,
    key: 'StoneStatus',
  },
  {
    exact: true,
    path: '/lot-history',
    component: LotHistory,
    key: 'LotHistory',
  },
  {
    exact: true,
    path: '/add-lot-history',
    component: AddLotHistory,
    key: 'AddLotHistory',
  }
];

// class RouterConfig extends Component {

//   componentWillReceiveProps(nextProps) {
//     console.log("Router config", nextProps);
//   }

//   render() {
//     return (
//       <div>

//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   route: state.route
// })

// export default connect(mapStateToProps, null)(RouterConfig);
// export default RouterConfig;