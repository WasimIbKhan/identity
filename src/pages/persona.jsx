import React,{useState, useEffect, useCallback} from 'react'
import NewPersonaButton from '../components/UI/NewPersona'
import { useSelector, useDispatch } from 'react-redux'
import * as communityAction from '../store/actions/community'
import CommunityItem from '../components/CommunityItem'
const Persona = () => {
      return(
        <div>
            <NewPersonaButton />
        </div>
    )
};

export default Persona;