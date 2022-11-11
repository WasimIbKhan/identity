import {SET_COMMUNITIES, SET_COMMUNITY_POSTS, CREATE_COMMUNITY,CREATE_COMMUNITY_POST, UPDATE_COMMUNITY, CHOOSING_COMMUNITY, JOIN_COMMUNITY, UN_JOIN_COMMUNITY, DELETE_COMMUNITY_POST} from '../actions/community'
import Community from '../../models/community'
import Post from '../../models/post'
const initialState = {
    communities: [],
    posts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
      case CHOOSING_COMMUNITY:
        return {
          ...state,
          communities: state.communities
        }
      case SET_COMMUNITY_POSTS:
        const orderedPosts = (action.posts).sort((a, b) => {
          var dateA = new Date(a.postTime), dateB = new Date(b.postTime)
          return dateB - dateA
      });
        return {
          ...state,
          communities: state.communities,
          posts: orderedPosts
        }
      case SET_COMMUNITIES:
          return {
            ...state,
            communities: action.communities
          }
      case CREATE_COMMUNITY:
        const newCommunity = new Community(
            action.communityData.id,
            action.communityData.personaId,
            action.communityData.personaName,
            action.communityData.profileImage,
            action.communityData.communityName,
            action.communityData.icon,
            action.communityData.banner,
            action.communityData.introduction
        );
        return {
            ...state,
            communities: state.communities.concat(newCommunity)
        };
      case UPDATE_COMMUNITY: 
        const communityIndex = state.communities.findIndex(
          community => community.id === action.communityData.id
          )
          const updateCommunity = new Community(
            action.communityData.id,
            action.communityData.personaId,
            action.communityData.personaName,
            action.communityData.profileImage,
            action.communityData.communityName,
            action.communityData.icon,
            action.communityData.banner,
            action.communityData.introduction
          )
          const updatedCommunies = [...state.communities]
          updatedCommunies[communityIndex] = updateCommunity
        return {
          ...state,
          communities: updatedCommunies

        }
      case JOIN_COMMUNITY:
        const joinedCommunity = new Community(
          action.communityData.id,
          action.communityData.personaId,
          action.communityData.personaName,
          action.communityData.profileImage,
          action.communityData.communityName,
          action.communityData.icon,
          action.communityData.banner,
          action.communityData.introduction
      );
      return {
        ...state,
        communities: state.communities.concat(joinedCommunity)
      }
      case UN_JOIN_COMMUNITY:
        return {
          ...state,
          communities: state.communities.filter(community => community.id !== action.communityId)
        }
      case CREATE_COMMUNITY_POST:
        const newPost = new Post(
          action.postData.userId,
          action.postData.personaId,
          action.postData.personaName,
          action.postData.personaType,
          action.postData.profileImage,
          action.postData.postId,
          action.postData.postTitle,
          action.postData.postMediaUri,
          action.postData.postLabel,
          action.postData.postTime,
          action.postData.likes,
          action.postData.repost
      );
      return {
        ...state,
        posts: state.posts.concat(newPost)
      };
      case DELETE_COMMUNITY_POST: 
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    }
    return state;
  };