import {
    SET_FOLLOWERS,
    SET_FOLLOWING,
    SET_ALL_FOLLOWERS,
    SET_ALL_FOLLOWING,
    ADD_FOLLOWER,
    REMOVE_FOLLOWER,
    UNFOLLOW,
    SET_PERSONA_RELATIONSHIP,
    ADD_PERSONA_RELATIONSHIP,
    REMOVE_SPECIAL_RELATIONS,
  } from "../actions/personaRelationships";
  
  import UsersPersona from "../../models/usersPersona";
  import PersonaChannel from "../../models/persona-channel";
  
  const initialState = {
    specialRelationsRequest: [],
    followersRequests: [],
    followers: [],
    following: [],
    allFollowers: [],
    allFollowing: [],
    personaRelationships: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FOLLOWERS:
        return {
          ...state,
          followers: action.followers,
        };
      case SET_FOLLOWING:
        return {
          ...state,
          following: action.following,
        };
      case SET_ALL_FOLLOWERS:
        return {
          ...state,
          allFollowers: action.allFollowers,
        };
      case SET_ALL_FOLLOWING:
        return {
          ...state,
          allFollowing: action.allFollowing,
        };
      case SET_PERSONA_RELATIONSHIP:
        return {
          ...state,
          personaRelationships: action.personaRelationships,
        };
      case ADD_FOLLOWER:
        const follower = new UsersPersona(
          action.followersData.id,
          action.followersData.personaId,
          action.followersData.personaName,
          action.followersData.imageUri,
          action.followersData.personaType
        );
        return {
          ...state,
          followers: state.followers.concat(follower),
          followersRequests: state.followersRequests.filter(
            (followersRequests) =>
              followersRequests.personaId !== action.followersData.personaId
          ),
        };
      case REMOVE_FOLLOWER:
        return {
          ...state,
          followers: state.followers.filter(
            (follower) => follower.id !== action.followerId
          ),
        };
      case UNFOLLOW:
        return {
          ...state,
          following: state.following.filter(
            (following) => following.id !== action.followingId
          ),
        };
      case ADD_PERSONA_RELATIONSHIP:
        const personaRelationship = new UsersPersona(
          action.personaRelationshipData.id,
          action.personaRelationshipData.personaId,
          action.personaRelationshipData.personaName,
          action.personaRelationshipData.imageUri,
          action.personaRelationshipData.personaType
        );
        return {
          ...state,
          personaRelationships: state.personaRelationships.concat(personaRelationship),
        };
    }
    return state;
  };
  