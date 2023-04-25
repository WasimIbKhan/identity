import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, addDoc, setDoc, doc, collection} from "firebase/firestore"; 

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT';


export const login = (email, password) => {

  return async dispatch => {
    let firebaseUser;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const idToken = userCredential.user.refreshToken
        dispatch({ type: LOGIN, userId: userId, token: idToken })
        //saveDataToStorage(idToken, firebaseUser.uid);
      })
  };
};

export const signup = (email, fullname, password) => {
  return async dispatch => {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const firebaseUser = userCredential.user;
        const userId = firebaseUser.uid
        const idToken = firebaseUser.refreshToken
        const db = getFirestore()

        let newId;

        await addDoc(collection(db, `users/${userId}/identities`), {
          identity_name: fullname,
          identity_type: 'Public',
          identity_image: ''
        }).then(async(ref) => {
          newId = ref.id
        })
    
        await setDoc(doc(db, `identities/${newId}`), {
          userId: userId,
          identity_name: fullname,
          identity_type: 'Public',
          identity_image: ''
        });

        dispatch({ type: SIGNUP, userId: userId, token: idToken });
      })
  };
};