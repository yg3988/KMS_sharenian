//import node_modules
import React, { useState } from 'react';

//import axios servies
import api from "../services/index";

//import component
import Home from "../components/home"

const arrWorldName = ['스카니아', '베라', '루나', '제니스', '크로아', '유니온', '엘리시움', '이노시스', '레드', '오로라', '아케인', '노바', '리부트', '리부트2']

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    const { name, value } = e.target;
    setValue(prevState => ({ ...prevState, [name]: value }))
  }

  const onClick = e => {
    const name = e.target.className;
    const value = arrWorldName[e.target.id]

    setValue(prevState => ({ ...prevState, [name]: value }))
  }

  return { value, onChange, onClick }
}

const HomeContainer = () => {
  const guild = useInput({ world: "스카니아", guild: "" })

  return (
    <Home
      guild={guild}
      service={api.searchGuild}
    />
  );
}

export default HomeContainer;