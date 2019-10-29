import React, { Component } from 'react';
import logo from './images/banner.jpg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <header className="App-header">
            <div>
              <div class="Header-title">
                  MyGreenProfile
              </div>

            </div>
            <img src={logo} className="App-logo" alt="logo" />

          </header>
          <div style={{ margin: '32px'}}>
            <Route exact path="/" component={Home} />
            <Route path="/react/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
