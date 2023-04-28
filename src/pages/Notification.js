import React, { useEffect, useState, useCallback } from "react";
import "./Notification.css";
import Identity from '../models/identity'
import { useDispatch, useSelector } from "react-redux";
import * as relationshipsActions from '../store/actions/relationships'

const NotificationPage = (props) => {
    const dispatch = useDispatch()
    const followerRequests = useSelector(state => state.relationships.followersRequests)
    const user = useSelector(state => state.auth.user)
    const [isLoading, setLoading] = useState(true)

    const loadIdentities = useCallback(async () => {
        try {
            await dispatch(relationshipsActions.fetchFollowersRequest());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadIdentities().then(() => {
            setLoading(false)
        })
    }, [loadIdentities])

    async function addFollower(followerData) {
        console.log(followerData)
        dispatch(relationshipsActions.addFollower(followerData.id, followerData.name, "Public", followerData.profileImage))
    }

    function handleDelete() {
        console.log('delete button clicked');
    }

    return (
        <div className="notification-page">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {followerRequests.map((data, index) => (
                        <div className="followersRequestContainer" key={index}>
                            <div className="profile-icon">
                                <img src={data.profileImage} alt="Profile" />
                                <div className="profile-info">
                                    <h2>{data.name}</h2>
                                    <p>{data.type}</p>
                                </div>
                            </div>
                            
                            <div className="buttonContainer">
                                <div className="button" onClick={handleDelete}>Delete</div>
                                <div className="button" onClick={() => addFollower(data)}>Add</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
