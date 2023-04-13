import React,{useState, useEffect, useCallback} from 'react'
import './persona.css'
const Identity = () => {
      return(
        <div className='profile-container'>
            <div className='bannerContainer'>
                <div className="imageContainer">
                    <img className="profile-image" src="https://placeimg.com/200/200/animals" alt="profile" />
                </div>              
            </div>
        </div>
    )
};

export default Identity;