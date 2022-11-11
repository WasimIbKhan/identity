import React from 'react';
import Card from '../components/UI/Card'
import './CommunityItem.css';

const CommunityItem = (props) => {
  return (
    <div>
        <Card className='community-item' imageBackground={props.banner}>
            <div className='community__description'>
                <h2>{props.title}</h2>
            </div>
            <img className='community-item' src={props.Icon} style={{width: '7.5vw', overflow: 'hidden', border: '1px solid black', borderRadius: '15vw'}}/>
        </Card>
    </div>
    
  );
}

export default CommunityItem;
