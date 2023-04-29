import {
    SET_HOME_POSTS,
} from '../actions/home'

const initialState = {
    posts: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_HOME_POSTS:
            return {
                ...state,
                posts: action.posts,
            }
        }
        return state;
    }