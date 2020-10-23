//import node_modules
import React, { useState, useEffect } from 'react';

//import axios servies
import api from "../services/index";

//import component
import Home from "../components/home"

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    const { name, value } = e.target;
    setValue(prevState => ({ ...prevState, [name]: value }))
  }

  const onClick = e => {
    const name = e.target.className;
    const value = e.target.id;

    setValue(prevState => ({ ...prevState, [name]: value }))
  }

  return { value, onChange, onClick }
}

const HomeContainer = () => {
  const guild = useInput({ world: "0", guild: "" })
  useEffect(() => {
    //console.log(guild.value);
  })
  return (
    <Home
      guild={guild}
      service={api.getGuildInDB}
    />
  );
}

export default HomeContainer;