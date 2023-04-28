import {
    SET_FOLLOWERS,
    SET_FOLLOWING,
    SET_FOLLOWERS_REQUEST,
    ADD_FOLLOWER
  } from "../actions/relationships";
  
  import User from '../../models/user'
  const initialState = {
    followersRequests: [],
    followers: [],
    following: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FOLLOWERS_REQUEST:
        return {
          ...state,
          followersRequests: action.followersRequests
        };
      case ADD_FOLLOWER:
        const follower = new User(
          action.followersData.id,
          action.followersData.name,
          action.followersData.profileImage,
          action.followersData.following,
          action.followersData.follower,
          action.followersData.identities
        );
        return {
          ...state,
          followers: state.followers.concat(follower),
          followersRequests: state.followersRequests.filter(
            (followersRequests) =>
              followersRequests.id !== action.followersData.id
          ),
        };
    }
    return state;
  };
  