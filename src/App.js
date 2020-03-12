import React, { Fragment, Component } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Routes from './router/routes';
import { hotkeys } from 'react-keyboard-shortcuts'

import StorageService from './services/StorageService';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    updateHeader: 'login'
  }

  hot_keys = {
    'ctrl+a': { // combo from mousetrap
      priority: 1,
      handler: (event) => {
        console.log(this.props);
        this.props.history.push('/start-end-lot-history')
      }
    },
  }


  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    const updateHeader = nextProps.headerReducer && nextProps.headerReducer.header ? nextProps.headerReducer.header : 'login';
    this.setState({ updateHeader: updateHeader });
  }

  render() {
    const { updateHeader } = this.state;
    console.log("updateHeader", updateHeader);
    const token = StorageService.getToken();
    return (
      <div>
        <Router>

          {/* <header className="App-header">
        </header> */}
          <header style={{ height: '50px' }}>
            <Row>
              <Col sm="2" style={{ lineHeight: '67px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '20px', paddingLeft: '20px' }}>Diamond Tracker</span>
              </Col>
              {token && <Fragment>
                <Col sm="8" className="text-align-right">
                  <NavLink exact activeClassName="active" className="nav-link" to="/home">Dashboard</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/start-end-lot-history">All</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/start-lot-history">Start</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/end-lot-history">End</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/person">Person</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/rough">Rough</NavLink>
                  <NavLink exact activeClassName="active" className="nav-link" to="/stones">Kapan</NavLink>
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
    )
  }
}

const mapStateToProps = state => ({
  headerReducer: state.headerReducer
})

export default connect(mapStateToProps)(hotkeys(App));


