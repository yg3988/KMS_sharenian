import React, { useState } from 'react';

import './home.css'

const world = ['스카니아', '베라', '루나', '제니스', '크로아', '유니온', '엘리시움', '이노시스', '레드', '오로라', '아케인', '노바', '리부트', '리부트2']

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => {
    const { name, value } = e.target;
    setValue(prevState => ({ ...prevState, [name]: value }))
    console.log(value);
  }
  const onClick = e => {
    const name = e.target.name;
    const value = world[e.target.id]
    setValue(prevState => ({ ...prevState, [name]: value }))
  }

  return { value, onChange, onClick }
}

const Home = (
  { service }
) => {
  const guild = useInput({ world: "스카니아", guild: "" })

  const handleKeyPress = e => {
    if (e.key == 'Enter') {
      console.log(guild.value)
      service(guild.value);
    }
  }

  const worlds = [
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
          <div className="default_checked">{guild.value.world}</div>
          <ul>
            <li className='worlds'>
              <input type="radio" id="0" className='radio_btn' name="world" onChange={guild.onClick} />
              <img src="https://ssl.nx.com/s2/game/maplestory/renewal/common/world_icon/icon_8.png" alt="스카니아" />
              <label htmlFor="0" className="world">스카니아</label>
            </li>
            {worlds.map((world, idx) => (
              <li key={world} className='worlds'>
                <input type="radio" id={idx + 1} name="world" className='radio_btn' onChange={guild.onClick} />
                <img src={world[0]} alt={world} />
                <label htmlFor={idx + 1} className="world">{world[1]}</label>
              </li>
            ))}
          </ul>
        </div>
        <input
          className='input_bar'
          type='text'
          placeholder="Typing Your Guild"
          name="guild"
          onChange={guild.onChange}
        />
      </div>
    </div>
  )
}

export default Home;