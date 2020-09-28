import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import api from '../services/index';

import FailedSearchGuild from '../components/failed-search-guild'

const useGuild = (initialValue) => {
  const [value, setGuild] = useState(initialValue);

  const onChange = e => {
    setGuild(e.target.value)
  }

  return { value, onChange }
}

const FailedSearchGuildContainer = (props) => {
  const params = queryString.parse(useLocation().search);
  const guild = useGuild({ world: params.world, guild: params.guild });

  const value = guild.value
  useEffect(() => {
    console.log(value);
    api.searchGuild(value)
      .then((response) => {
        const res = JSON.parse(response.request.response);
        window.location.href = `/guild/${res.data._id}`
      })
  })

  return (
    <FailedSearchGuild />
  );
}

export default FailedSearchGuildContainer;