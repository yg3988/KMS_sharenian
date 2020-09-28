import React from 'react';

import './failed-search-guild.css'

const failedSearchGuild = (
  props
) => {
  return (
    <div className="error">
      <div className="loading">
        <div className="loading_circle" />
        <div className="loading_circle" />
        <div className="loading_circle" />
        <div className="loading_circle" />
      </div>
      <div className="loading_comment">
        Not Found Guild<br />Wait few Seconds...
      </div>
    </div >
  );
}

export default failedSearchGuild;