//import node_modules
import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import { useLocation } from "react-router-dom";

//import axios servies
import api from "../services/index";

//import component
import Sharenian from "../components/sharenian"

const SharenianContainer = () => {
  const gid = useLocation().pathname.split('/')[2];

  return (
    <div>
      <Sharenian
        gid={gid}
      />
    </div>
  );
}

export default SharenianContainer;