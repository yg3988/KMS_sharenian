import React from 'react';

import './home.css'

const Home = (
  props
) => {
  const guild = props.guild;

  const handleToggleSelectBox = () => {
    const selectBox = document.getElementsByClassName("select_box");
    if (selectBox[0].style.display === "block")
      selectBox[0].style.display = "none"
    else
      selectBox[0].style.display = "block"
  }

  const handleChangeServer = (e) => {
    guild.onClick(e);
    handleToggleSelectBox();
  }

  const handleKeyPress = e => {
    if (e.key == 'Enter') {
      props.service(guild.value)
        .then((response) => {
          const res = JSON.parse(response.request.response);
          window.location.href = `/guild/${res.data}`
        })
        .catch((e) => {
          window.location.href = `/404?world=${guild.value.world}&guild=${guild.value.guild}`
        });
    }
  }

  const arrWorlds = [
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_8.png', "스카니아"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_12.png', "베라"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_9.png', "루나"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_10.png', "제니스"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_11.png', "크로아"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_7.png', "유니온"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_13.png', "엘리시움"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_6.png', "이노시스"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_5.png', "레드"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_4.png', "오로라"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_14.png', "아케인"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_15.png', "노바"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_2.png', "리부트"],
    ['https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_2.png', "리부트2"]
  ]

  return (
    <div className='home'>
      <div className='search_bar_container' onKeyPress={handleKeyPress}>
        <div className='drop_down'>
          <div className="default_checked" onClick={handleToggleSelectBox}>{arrWorlds[guild.value.world][1]}</div>
          <ul className='select_box worlds'>
            {arrWorlds.map((world, idx) => (
              <li key={idx} id={idx} className='world' onClick={handleChangeServer} >
                <img src={world[0]} alt={world[1]} />
                <span id={idx} className="world">{world[1]}</span>
              </li>
            ))}
          </ul>
        </div>
        <input
          className='input_bar'
          type='text'
          placeholder="Typing Your Guild"
          name="guild"
          onChange={props.guild.onChange}
        />
      </div>
    </div>
  )
}

export default Home;