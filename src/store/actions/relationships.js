import Identity from '../../models/identity'
import {getFirestore, setDoc, getDocs, getDoc, addDoc, doc, collection, updateDoc, where, query } from "firebase/firestore"; 
export const SET_FOLLOWERS = 'SET_FOLLOWERS'
export const SET_FOLLOWING = 'SET_FOLLOWING'
export const SET_FOLLOWERS_REQUEST = 'SET_FOLLOWERS_REQUEST'


export const fetchFollowersRequest = () => {
  return async (dispatch, getState) =>{
    const userId = getState().auth.userId;
    const db = getFirestore()
    const loadedRequests = [];
    
    await getDocs(collection(db, `users/${userId}/follower_request`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        loadedRequests.push(
            new Identity(
              doc.id,
              doc.data().identity_name,
              doc.data().identity_type,
              doc.data().identity_image
            )
          );
      });
    })
    //await d
    dispatch({
      type: SET_FOLLOWERS_REQUEST,
      followersRequests: loadedRequests
    })
  }
}