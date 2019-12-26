import React, { Fragment } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import { Row, Col } from 'reactstrap';
import Routes from './router/routes';

import StorageService from './services/StorageService';
import logo from './logo.svg';
import './App.css';

function App() {
  const token = StorageService.getToken();
  return (
    <div>
      <Router>

        {/* <header className="App-header">
      </header> */}
        <header style={{ height: '50px' }}>
          <Row>
            <Col sm="2" style={{ lineHeight: '67px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px', paddingLeft: '20px' }}>Dmd</span>
            </Col>
            {token && <Fragment>
              <Col sm="8" className="text-align-right">
                <NavLink exact activeClassName="active" className="nav-link" to="/home">Dashboard</NavLink>
                <NavLink exact activeClassName="active" className="nav-link" to="/person">Person</NavLink>
                <NavLink exact activeClassName="active" className="nav-link" to="/rough">Rough</NavLink>
              </Col>
              <Col sm="2" className="text-align-right">
                <NavLink exact activeClassName="active" className="nav-link" to="/logout">Logout</NavLink>

              </Col>
            </Fragment>}
          </Row>
        </header>
        <hr />

        <Routes />
      </Router>
    </div>
  );
}

export default App;
