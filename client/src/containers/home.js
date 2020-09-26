//import node_modules
import React from "react";

//import axios servies
import api from "../services/index";

//import component
import Home from "../components/home"

const HomeContainer = () => {

  return (
    <Home
      service={api}
    />
  )
}

export default HomeContainer;