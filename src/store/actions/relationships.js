import User from '../../models/user'
import { getFirestore, setDoc, getDocs, getDoc, addDoc, doc, collection, updateDoc, where, query, increment } from "firebase/firestore";
export const SET_FOLLOWERS = 'SET_FOLLOWERS'
export const SET_FOLLOWING = 'SET_FOLLOWING'
export const SET_FOLLOWERS_REQUEST = 'SET_FOLLOWERS_REQUEST'
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

    console.log(loadedRequests)
    dispatch({
      type: SET_FOLLOWERS_REQUEST,
      followersRequests: loadedRequests
    })
  }
}

export const addFollower = (followerUserId, name, type, profileImage) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    const user = getState().auth.user
    
     const db = getFirestore()

    await setDoc(doc(db, `users/${userId}/followers/${followerUserId}`), {
      identity_name: name,
      identity_type: type,
      identity_image: profileImage
    })

    await setDoc(doc(db, `users/${followerUserId}/following/${userId}`), {
      identity_name: user.name,
      identity_type: "Public",
      identity_image: user.profileImage
    })

    await updateDoc(doc(db, `users/${userId}`), {
      followers: increment(1)
    })

    await updateDoc(doc(db, `users/${followerUserId}`), {
      following: increment(1)
    })

    await addDoc(collection(db, `users/${followerUserId}/home`), {
      userId: userId,
      identity_id: user.id,
      priority: 3
    })

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