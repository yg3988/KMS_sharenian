import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import HomeContainer from "./containers/home";
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
                  <Link to="/sharenian/:id">샤레니안 관리</Link>
                </li>
                <li>
                  <Link to="/guilduser/:id">길드 정보</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <Switch>
          <Route path="/">
            <HomeContainer />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;