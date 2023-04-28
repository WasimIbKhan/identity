import {
    SET_FOLLOWERS,
    SET_FOLLOWING,
    SET_FOLLOWERS_REQUEST
  } from "../actions/relationships";
  
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
    }
    return state;
  };
  