import React from 'react';

import "./sharenian.css"

const Sharenian = (props) => {
  const gid = props.gid
  console.log(gid)
  return (
    <div className="guild_wrapper">
      {gid}
    </div>
  );
}

export default Sharenian;