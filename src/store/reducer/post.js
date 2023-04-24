import {
    SET_PERSONA_POST,
    CREATE_POST,
    DELETE_POST
} from '../actions/post'
import Post from '../../models/post'

const initialState = {
    posts: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PERSONA_POST:
            return {
                posts: action.posts
            }
        case CREATE_POST:
            const newPost = new Post(
                action.postData.id,
                action.postData.userId,
                action.postData.identity_id,
                action.postData.identity_name,
                action.postData.identity_type,
                action.postData.identity_image,
                action.postData.postTitle,
                action.postData.postMediaUri,
                action.postData.postLabel,
                action.postData.postTime,
                action.postData.likes
                )
            return {
                ...state,
                posts: state.posts.concat(newPost)
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(
                    post => post.id !== action.postId
                  )
            }
    }
    return state;
}