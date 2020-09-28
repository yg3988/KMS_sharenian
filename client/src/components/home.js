import React from 'react';

import './home.css'

const Home = (
  props
) => {
  const handleToggleSelectBox = () => {
    const selectBox = document.getElementsByClassName("select_box");
    if (selectBox[0].style.display === "block")
      selectBox[0].style.display = "none"
    else
      selectBox[0].style.display = "block"
  }

  const handleChangeServer = (e) => {
    props.guild.onClick(e);
    handleToggleSelectBox();
  }

  const handleKeyPress = e => {
    if (e.key == 'Enter') {
      props.service(props.guild.value)
        .then((response) => {
          const res = JSON.parse(response.request.response);
          window.location.href = `/guild/${res.data._id}`
        })
        .catch((response) => {
          window.location.href = `/404?world=${props.guild.value.world}&guild=${props.guild.value.guild}`
        });
    }
  }

  const arrWorlds = [
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
          <div className="default_checked" onClick={handleToggleSelectBox}>{props.guild.value.world}</div>
          <ul className='select_box worlds'>
            <li id="0" className='world' onClick={handleChangeServer}>
              <img src="https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_8.png" alt="스카니아" />
              <span id="0" className="world">스카니아</span>
            </li>
            {arrWorlds.map((world, idx) => (
              <li key={idx + 1} id={idx + 1} className='world' onClick={handleChangeServer} >
                <img src={world[0]} alt={world} />
                <span id={idx + 1} className="world">{world[1]}</span>
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