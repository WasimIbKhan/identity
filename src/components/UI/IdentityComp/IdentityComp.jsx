import React from "react";
import "./IdentityComp.css";

function IdentityComp(props) {
  return (
    <div className="profile-icon">
      <img src={props.identity.identity_image} alt="Profile" />
      <div className="profile-info">
        <h2>{props.identity.identity_name}</h2>
        <p>{props.identity.identity_type}</p>
      </div>
    </div>
  );
}

export default IdentityComp;
