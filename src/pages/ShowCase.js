
import React, { useCallback, useEffect, useState } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as relationshipAction from '../store/actions/relationships';
import './ShowCase.css'

import { useNavigate, useLocation } from "react-router-dom";

import IdentityComp from "../components/UI/IdentityComp/IdentityComp";
import { useSelector, useDispatch } from "react-redux";

const Showcase = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const identities = useSelector(state => state.identities.identities)
    const index = useSelector(state => state.identities.index)
    const identity = identities[index]
    const follwers = useSelector(state => state.relationships.followers)

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
          <h1>Do you want to reveal one of your identities to another person?</h1>
          <h4>Click on the user who you wish to reveal it to!</h4>
            {follwers.map((data, index) => (
              <div  onClick={() => onClickUser(data, identity, navigate)}>
                <IdentityComp identity={data} />
              </div>
            ))}
        </div>

    )
}

async function  onClickUser (follower, identity, navigate) {
  const db = getFirestore()
    await setDoc(doc(db, `users/${follower.id}/showcased_identities/${identity.id}`), {
      identity_name: identity.name,
      identity_type: identity.type,
      identity_image: identity.profileImage,
      is_main_identity: identity.isPublic,
      identity_privacy: identity.privacy
    });
    navigate("/dashboard/identity");
}


export default Showcase;