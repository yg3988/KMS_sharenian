import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import {
  Home,
  Sharenian,
  Failed
} from "./containers/index"

import Footer from "./components/footer/footer"

function App() {
  return (
    <Router>
      <div className="App">

        <header className="header">
          <nav className="navbar">
            <div className="navbar_title">
              <Link to="/">Maple Guild</Link>
            </div>
            <div className="navbar_items">
              <ul>
                <li>
                  <Link to="/guild/:id/sharenian/">샤레니안 관리</Link>
                </li>
                <li>
                  <Link to="/guild/:id/guilduser/">길드 정보</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <Switch>
          <Route exact path="/" exact>
            <Home />
          </Route>
          <Router exact path="/guild/:id" >
            <Sharenian />
          </Router>
          <Router path="/404/:world?" >
            <Failed />
          </Router>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;