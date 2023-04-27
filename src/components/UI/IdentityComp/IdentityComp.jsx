import React from "react";
import "./IdentityComp.css";

function IdentityComp(props) {
  return (
    <div className="profile-icon">
      <img src={props.identity.profileImage} alt="Profile" />
      <div className="profile-info">
        <h2>{props.identity.name}</h2>
        <p>{props.identity.type}</p>
      </div>
    </div>
  );
}

export default IdentityComp;
