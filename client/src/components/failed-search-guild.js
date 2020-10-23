import React from 'react';

import './failed-search-guild.css'

const failedSearchGuild = (
  props
) => {
  const notice = props.notice.split('\n');

  return (
    <div className="error">
      <div className="loading">
        <div className="loading_circle" />
        <div className="loading_circle" />
        <div className="loading_circle" />
        <div className="loading_circle" />
      </div>
      <div className="loading_comment">
        {notice[0]}<br/>{notice[1]}
      </div>
    </div >
  );
}

export default failedSearchGuild;