import React from "react";
import "./IdentityBar.css";

function ProfileTopBar(props) {
  return (
    <div className="profile-top-bar">
      <div className="profile-name-container">
        <div>Wasim</div>
      </div>
      <div>
        <img
            className="profile-image"
            src="https://placeimg.com/200/200/animals"
            alt="profile"
          />
      </div>
    </div>
  );
}

export default ProfileTopBar;
