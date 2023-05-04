import {getFirestore, query, getDocs, where, collection, getDoc,} from "firebase/firestore"; 
import Home from '../../models/home'
import Post from '../../models/post'
export const SET_HOME_POSTS = "SET_HOME_POSTS"

export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    const db = getFirestore()
    const userIds = [] 
    const communityIds = []
    const communityPosts = []
    const followingPosts = []
    await getDocs(collection(db, `users/${userId}/following`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userIds.push(doc.id)
      });
    })

    await getDocs(collection(db, `users/${userId}/joined_communities`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        communityIds.push(doc.id)
      });
    });

    if (communityIds.length !== 0 ) {
      await getDocs(query(collection(db, "posts"), where("community_id", "in", communityIds))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          communityPosts.push(
            new Post(
              doc.id,
              doc.data().userId,
              doc.data().identity_id,
              doc.data().identity_name,
              doc.data().identity_type,
              doc.data().identity_image,
              doc.data().postTitle,
              doc.data().postMediaUri,
              doc.data().postLabel,
              doc.data().postTime,
              doc.data().likes
          )
            );
        });
      })
    }
   
    if(userIds.length !== 0) {
      await getDocs(query(collection(db, "posts"), where("userId", "in", userIds))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          followingPosts.push(
            new Post(
              doc.id,
              doc.data().userId,
              doc.data().identity_id,
              doc.data().identity_name,
              doc.data().identity_type,
              doc.data().identity_image,
              doc.data().postTitle,
              doc.data().postMediaUri,
              doc.data().postLabel,
              doc.data().postTime,
              doc.data().likes
          )
            );
        });
      })
    }
    const allPosts = [...communityPosts,...followingPosts]
    console.log(allPosts)
    dispatch({
      type: SET_HOME_POSTS,
      posts: allPosts
    });
  }}