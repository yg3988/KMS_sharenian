import React, { useState } from 'react';

import './home.css'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => {
    setValue(e.target.value);
  }
  return { value, onChange }
}

const Home = (
  { service }
) => {
  console.log(service)
  const nick = useInput("")
  const handleKeyPress = e => {
    if (e.key == 'Enter') {
      const payload = { name: nick.value }
      console.log(payload);
      service.insertUser(payload);
    }
  }

  return (
    <div className='home'>
      <div className='search_bar_container'>
        <input
          className='input_bar'
          type='text'
          placeholder="Typing Your Character's name"
          onChange={nick.onChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default Home;