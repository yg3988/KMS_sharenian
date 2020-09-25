import React from 'react';
import './App.css';

import Navbar from "./components/navbar/navbar";
import HomeContainer from "./containers/home";
import Footer from "./components/footer/footer"
function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeContainer />
      <Footer />
    </div>
  );
}

export default App;