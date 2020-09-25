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
  service
) => {
  const nick = useInput("")

  return (
    <div className='home'>
      <div className='search_bar_container'>
        <input
          className='input_bar'
          type='text'
          placeholder="Typing Your Character's name"
          onChange={nick.onChange}
        />
      </div>
    </div>
  )
}

export default Home;