import User from '../../models/user'
import { getFirestore, setDoc, getDocs, getDoc, addDoc, doc, collection, updateDoc, where, query, increment, deleteDoc } from "firebase/firestore";
import Identity from '../../models/identity';
export const SET_FOLLOWERS = 'SET_FOLLOWERS'
export const SET_FOLLOWING = 'SET_FOLLOWING'
export const SET_FOLLOWERS_REQUEST = 'SET_FOLLOWERS_REQUEST'
export const SET_SHOWCASED_IDENTITIES = 'SET_SHOWCASED_IDENTITIES'
export const ADD_FOLLOWER = "ADD_FOLLOWER"


export const fetchFollowersRequest = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const db = getFirestore()
    const loadedRequests = [];

    await getDocs(collection(db, `users/${userId}/follower_request`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        loadedRequests.push(
            new User(
              doc.id,
              doc.data().identity_name,
              doc.data().identity_image
            ))
      });
    });

    dispatch({
      type: SET_FOLLOWERS_REQUEST,
      followersRequests: loadedRequests
    })
  }
}

export const fetchFollowers = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    const db = getFirestore()
    const followers = []
    await getDocs(collection(db, `users/${userId}/followers`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        followers.push(
            new User(
              doc.id,
              doc.data().identity_name,
              doc.data().identity_image
            ))
      });
    });
    dispatch({
      type: SET_FOLLOWERS,
      followers: followers
    })
  }
}

export const fetchShowCasedIdentities = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const db = getFirestore()
    const showcased_identities = [];

    await getDocs(collection(db, `users/${userId}/showcased_identities`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        showcased_identities.push(
            new Identity(
              doc.id,
              doc.data().identity_name,
              doc.data().identity_type,
              doc.data().identity_image,
              doc.data().is_main_identity,
              doc.data().identity_privacy
            ))
      });
    });
    console.log("here")
    console.log(showcased_identities)
    dispatch({
      type: SET_SHOWCASED_IDENTITIES,
      showcased_identities: showcased_identities
    })
  }
}

export const addFollower = (followerUserId, name, type, profileImage) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    const user = getState().auth.user
    
     const db = getFirestore()

    setDoc(doc(db, `users/${userId}/followers/${followerUserId}`), {
      identity_name: name,
      identity_type: type,
      identity_image: profileImage
    })

    setDoc(doc(db, `users/${followerUserId}/following/${userId}`), {
      identity_name: user.name,
      identity_type: "Public",
      identity_image: user.profileImage
    })

    updateDoc(doc(db, `users/${userId}`), {
      followers: increment(1)
    })

    updateDoc(doc(db, `users/${followerUserId}`), {
      following: increment(1)
    })

    addDoc(collection(db, `users/${followerUserId}/home`), {
      userId: userId,
      identity_id: user.id,
      priority: 3
    })

    deleteDoc(doc(db, `users/${userId}/follower_request/${followerUserId}`))

    dispatch({
      type: ADD_FOLLOWER,
      followersData: {
        id: followerUserId,
        name: name,
        profileImage: profileImage,
      }
    })
  }
}