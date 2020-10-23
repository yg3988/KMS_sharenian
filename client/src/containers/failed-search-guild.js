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
  const [isCall, setCall] = useState(false);
  const [notice, setNotice] = useState("Not Found \n Creating Guild...")
  const value = guild.value

  useEffect(() => {
    if(!isCall){
      setCall(true)
      //메이플 홈페이지에서 간단한 길드 정보 가져오기
      api.getGuilds(value)
      .then(response => {
        const res = JSON.parse(response.request.response);
        //상세한 길드 정보
        return api.getGuildInfo(res)
      })
      .then(response => {
        //길드원 정보
        setNotice("Wait for a few minutes \n Collecting Members!")
        return api.getGuildMembers(response.data)
      })
      .then(response => {
        //DB 내에서 길드 정보 가져오기
        setNotice("Created Guild")
        return api.getGuildInDB(value)
      })
      .then(response => {
        const res = JSON.parse(response.request.response);
        window.location.href = `/guild/${res.data}`
      })
      .catch(err => {
        console.log(err)
        setNotice("Not Found Your Guild \n Check World & Guild")
      })
    }
  })

  return (
    <FailedSearchGuild 
      notice={notice}
    />
  );
}

export default FailedSearchGuildContainer;