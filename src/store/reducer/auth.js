import { LOGIN,SIGNUP, LOGOUT } from '../actions/auth';
import User from '../../models/user';
const initialState = {
  token: null,
  userId: null,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.user)
      return {
        token: action.token,
        userId: action.userId,
        user: action.user
      };
    case SIGNUP:
      let user = new User(
        action.userId,
        action.fullname,
        action.profileImage, 0, 0, 0)
      return {
        token: action.token,
        userId: action.userId,
        user: user
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
