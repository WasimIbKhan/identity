import React, { useState, useEffect } from 'react';
import {getFirestore, setDoc, doc } from "firebase/firestore"; 

import './CommunityPage.css'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
    const [isJoined, setJoined] = useState(false)
    const location = useLocation();
    const community = location.state.community

    const navigate = useNavigate()

    const userId = useSelector(state => state.auth.userId)
    const identities = useSelector(state => state.identities.identities)
    const index = useSelector(state => state.identities.index)
    const currentIdentities = identities[index]

    const joinFunc = async() => {
      const db = getFirestore()
      await setDoc(doc(db, `users/${userId}/joined_communities/${community.id}`), {
        community_name: community.communityName,
        community_icon: community.icon,
        community_banner: community.banner,
        community_introduction: community.introduction,
        joined_identity: currentIdentities.id
      });
    }

    const createFunc = () => {
      navigate('/dashboard/community/create-community-post', {
        state: { community: community }
    })
  }
  
  return (
    <div>
      <div className="backgroundImage">
        <img className="image" src={community ? community.banner : ''} />
        <div className="profile-icon">
            <img src={community.icon} alt="Profile" />
         </div>
      </div>
      <button className="button" style={{ backgroundColor: isJoined ? "#F6F6F6" : 'white' }} onClick={() => joinFunc()}>
          <span className="buttonText ">{isJoined ? 'Joined' : 'Join'}</span>
        </button>
      <button className="button-post"  onClick={() => createFunc()}>
        <span className="buttonText ">Create Post</span>
      </button>
      <div className="infoContainer">
        <div className="titleRow">
          <h2 className="title">{community ? community.communityName : ''}</h2>
        </div>
      </div>
      <p className="intro">{community.introduction}</p>
    </div>
  );
};

export default CommunityPage
