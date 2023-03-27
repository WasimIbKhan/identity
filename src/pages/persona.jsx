import React,{useState, useEffect, useCallback} from 'react'
import NewPersonaButton from '../components/UI/NewPersona'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as communityAction from '../store/actions/community'
import CommunityItem from '../components/CommunityItem'
const Persona = () => {
      return(
        <div>
            <h1>here!</h1>
            <Link to="edit-persona">   
                <NewPersonaButton />
            </Link>
        </div>
        
    )
};

export default Persona;