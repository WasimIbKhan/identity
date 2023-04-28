import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, addDoc, setDoc, doc, collection, getDoc,} from "firebase/firestore"; 
import User from '../../models/user';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT';


export const login = (email, password) => {

  return async dispatch => {
    const db = getFirestore()
    const auth = getAuth();
    let authUser = {};
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const userId = userCredential.user.uid;
        const idToken = userCredential.user.refreshToken
        await getDoc(doc(db, `users/${userId}`)).then((doc) => {
          authUser = new User(
            doc.id,
            doc.data().name,
            doc.data().profileImage,
            doc.data().follower,
            doc.data().following,
            doc.data().identities,
          )
    })
        dispatch({ type: LOGIN, userId: userId, token: idToken, user: authUser })
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

        await setDoc(doc(db, `users/${userId}`), {
          name: fullname,
          type: 'Public',
          profileImage: '',
          follower: 0,
          following: 0,
          identities: 0
        })

        await addDoc(collection(db, `users/${userId}/identities`), {
          identity_name: fullname,
          identity_type: 'Public',
          identity_image: '',
          is_main_identity: true
        }).then(async(ref) => {
          newId = ref.id
        })
    
        await setDoc(doc(db, `identities/${newId}`), {
          userId: userId,
          identity_name: fullname,
          identity_type: 'Public',
          identity_image: '',
          is_main_identity: true
        });

        dispatch({ type: SIGNUP, userId: userId, token: idToken, user: {
          userId: userId,
          name: fullname,
          profileImage: ''
        } });
      })
  };
};