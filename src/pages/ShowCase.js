
import React, { useCallback, useEffect, useState } from "react";
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore";
import * as relationshipAction from '../store/actions/relationships';
import './ShowCase.css'
import { useNavigate } from 'react-router-dom';

import IdentityComp from "../components/UI/IdentityComp/IdentityComp";
import { useSelector, useDispatch } from "react-redux";

const Showcase = () => {

    const follwers = useSelector(state => state.relationships.followers)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const loadFollowers = useCallback(async () => {
        try {
          await dispatch(relationshipAction.fetchFollowers())
        } catch (err) {
          console.log(err)
        }
      }, [dispatch, setIsLoading]);
    
      useEffect(() => {
        setIsLoading(true);
        loadFollowers().then(() => {
          setIsLoading(false);
        });
      }, [dispatch, loadFollowers]);

      if(isLoading) {
        return(
            <div>loading...</div>
        )
      }
    return (
        <div className="ShowCasePage" >
            {follwers.map((data, index) => (
                <IdentityComp identity={data} onClickUser={() => onClickUser(data)} />
            ))}
        </div>

    )
}

const onClickUser = follower => {

}


export default Showcase;