import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Routes from './Routes';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      {/* <header className="App-header">
      </header> */}
      <header>
        <Row>
          <Col sm="2">
            Dmd
          </Col>
          <Col sm="10">
            <span>Person</span>
            <span>Dashboard</span>
            <span>History</span>
          </Col>
        </Row>
      </header>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
