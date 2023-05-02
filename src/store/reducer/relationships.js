import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_FOLLOWERS_REQUEST,
  SET_SHOWCASED_IDENTITIES,
  ADD_FOLLOWER
} from "../actions/relationships";

import User from '../../models/user'
const initialState = {
  followersRequests: [],
  followers: [],
  following: [],
  showcased_identities: []
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
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: action.followers,
      };
      case SET_SHOWCASED_IDENTITIES:
        return {
          ...state,
          showcased_identities: action.showcased_identities
        }
  }
  return state;
};
