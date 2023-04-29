import React, { useState, useEffect } from 'react';
import './CommunityPage.css'
import { useLocation } from 'react-router-dom';

const CommunityPage = () => {
    const [isJoined, setJoined] = useState(false)
    const location = useLocation();
    const community = location.state.community
    
  return (
    <div>
      <div className="backgroundImage">
        <img className="image" src={community ? community.banner : ''} />
        <button className="button" style={{ backgroundColor: isJoined ? "#F6F6F6" : 'white' }} onClick={{}}>
          <span className="buttonText ">{isJoined ? 'Joined' : 'Join'}</span>
        </button>
        <div className="profile-icon">
            <img src={community.icon} alt="Profile" />
         </div>
      </div>
      <div className="infoContainer">
        <div className="titleRow">
          <h2 className="title">{community ? community.communityName : ''}</h2>
        </div>
        <p className="intro">{community ? community.introduction : ''}</p>
      </div>
      <p className="intro">{community.introduction}</p>
    </div>
  );
};

export default CommunityPage
