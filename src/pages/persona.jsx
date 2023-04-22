import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as identityAction from "../store/actions/identities";
import {useNavigate} from 'react-router-dom';
import "./persona.css";
const Identity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentIdentity = useSelector((state) => state.identities.identities[state.identities.index]);

  const [isLoading, setLoading] = useState(false);
  const loadIdentities = useCallback(async () => {
    try {
      dispatch(identityAction.fetchIdentities());
    } catch (error) {}
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);
    loadIdentities().then(() => {
      setLoading(false);
    });
  }, [loadIdentities]);

  const updateIdentity = useCallback(async () => {
    navigate('/dashboard/identity/edit-identity', {state:{currentIdentity: currentIdentity}})
  });
  return (
    <div>
      <div className="profile-info">
        <div className="bannerContainer">
          <div className="imageContainer" onClick={updateIdentity}>
            <img
              className="profile-image"
              src={currentIdentity.profileImage}
              alt="profile"
            />
          </div>
          <div className="nameContainer">
            <div className="profile-name-container">
              <div className="userName">{currentIdentity.name}</div>
              <div className="userPersonaType">{currentIdentity.type}</div>
            </div>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-label">Posts</span>
                <span className="stat-number">10</span>
              </div>
              <div className="profile-stat">
                <span className="stat-label">Followers</span>
                <span className="stat-number">100</span>
              </div>
              <div className="profile-stat">
                <span className="stat-label">Following</span>
                <span className="stat-number">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identity;
