import React from 'react';
import Card from '../components/UI/Card'
import './CommunityItem.css';

const CommunityItem = ({community, onClickCommunity}) => {
  return (
    <div onClick={() => onClickCommunity(community)}>
        <Card className='community-item' imageBackground={community.banner}>
            <div className='community__description'>
                <h2>{community.communityName}</h2>
            </div>
            <img className='community-item' src={community.icon} style={{width: '7.5vw', overflow: 'hidden', border: '1px solid black', borderRadius: '15vw'}}/>
        </Card>
    </div>
    
  );
}

export default CommunityItem;
