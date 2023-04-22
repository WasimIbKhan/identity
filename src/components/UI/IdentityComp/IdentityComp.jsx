import React from 'react';
import './IdentityComp.css';

function IdentityComp(props) {
  return (
    <div className="profile-icon">
      <img src={"https://placeimg.com/200/200/animals"} alt="Profile" />
        <div className="profile-info">
            <h2>{"Wasim"}</h2>
            <p>{"wasimibkhan@gmail.com"}</p>
        </div>
    </div>
  );
}

export default IdentityComp;
