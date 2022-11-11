import {SET_IDENTITIES, CREATE_IDENTITY, UPDATE_IDENTITY, DELETE_IDENTITY
  } from '../actions/identities';
  import Identity from '../../models/identity';
  
  const initialState = {
    identities: [],
    index: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_IDENTITIES:
        return {
          identities: state.identities,
          index: state.index
        };
      case CREATE_IDENTITY:
        const newIdentity = new Identity (
          action.identityData.id,
          action.identityData.name,
          action.identityData.type,
          action.identityData.profileImage,
        );
        return {
          ...state,
          personas: state.personas.concat(newIdentity),
          index: state.index
        };
      case UPDATE_IDENTITY:
        const personaIndex = state.personas.findIndex(
          persona => persona.id === action.pid
        );
        const updatedIdentity = new Identity(
          action.identityData.id,
          action.identityData.name,
          action.identityData.type,
          action.identityData.profileImage,
        );
        const updatedIdentities= [...state.personas];
        updatedIdentities[personaIndex] = updatedIdentity;
        return {
          ...state, 
          identities: updatedIdentities,
          index: state.index
        };
      case DELETE_IDENTITY:
        return {
          ...state,
          identities: state.identities.filter(
            identity => identity.id !== action.pid
          ),
          index: state.index
        };
      
    }
    return state;
  };
  