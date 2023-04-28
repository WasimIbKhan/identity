import React, { useEffect, useState, useCallback } from "react";
import "./Notification.css";
import Identity from '../models/identity'
import { useDispatch, useSelector } from "react-redux";
import * as relationshipsActions from '../store/actions/relationships'

const NotificationPage = (props) => {
    const dispatch = useDispatch()
    const followerRequests = useSelector(state => state.relationships.followersRequests)
    const [isLoading, setLoading] = useState()
    const loadIdentities = useCallback(async () => {
        try {
            await dispatch(relationshipsActions.fetchFollowersRequest());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        setLoading(true)
        loadIdentities().then(
            setLoading(false)
        )
    }, [dispatch])
    if (isLoading) {

    }
    if (isLoading) {
        return (
            <div>load</div>
        )
    }
    return (
        <div className="notification-page">
            {followerRequests.map((data, index) => (
                <div className="followersRequestContainer" onClick={{}}>
                    <div className="profile-icon">
                        <img src={data.profileImage} alt="Profile" />
                        <div className="profile-info">
                            <h2>{data.name}</h2>
                            <p>{data.type}</p>
                        </div>
                    </div>
                    
                    <div className="buttonContainer">
                        <div className="button" onClick={{}}>Delete</div>
                        <div className="button" onClick={{}}>Add</div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default NotificationPage;
