import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const SET_USER ='SET_USER'
export const SET_PERSONA = 'SET_PERSONA';

export const login = ( email, password) => {
  
    return async dispatch => {
      let firebaseUser;
        const auth = getAuth();
      signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
          const idToken = userCredential.user.refreshToken          
          dispatch({type: LOGIN, userId: userId, token: idToken})
            //saveDataToStorage(idToken, firebaseUser.uid);
        })
    };
  };