import React from 'react';
import './IdentityList.css';

const IdentityList = ({ identities, onClickIdentity }) => {
  return (
    <div className="profile-list">
      {identities.map((identity) => (
        <div className="identity-item" key={identity.id} onClick={()=> onClickIdentity(identity)}>
          <img className="identity-image" src={identity.profileImage} />
          <div className="identity-name">{identity.name}</div>
        </div>
      ))}
    </div>
  );
};

export default IdentityList;
