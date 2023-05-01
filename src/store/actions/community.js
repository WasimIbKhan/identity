import {getFirestore, addDoc, getDocs, setDoc, doc, collection } from "firebase/firestore"; 
import Community from '../../models/community'
export const SET_COMMUNITIES = 'SET_COMMUNITIES'
export const SET_COMMUNITY_POSTS = 'SET_COMMUNITY_POSTS'
export const CREATE_COMMUNITY = 'CREATE_COMMUNITY'
export const UPDATE_COMMUNITY = 'UPDATE_COMMUNITY'
export const CREATE_COMMUNITY_POST = 'CREATE_COMMUNITY_POST'
export const DELETE_COMMUNITY = 'DELETE_COMMUNITY'
export const JOIN_COMMUNITY = 'JOIN_COMMUNITY'
export const UN_JOIN_COMMUNITY = 'UN_JOIN_COMMUNITY'
export const CHOOSING_COMMUNITY = 'CHOOSING_COMMUNITY'
export const DELETE_COMMUNITY_POST = "DELETE_COMMUNITY_POST"

//import {Storage} from 'aws-amplify';

export const fetchCommunities = () => {
    return async (dispatch, getState) => {
      // any async code you want!
      const userId = getState().auth.userId;
    
      const db = getFirestore()
  
      const communities = [];
      
      await getDocs(collection(db, `users/${userId}/joined_communities`)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            communities.push(
              new Community(
                doc.id,
                doc.data().community_name,
                doc.data().community_icon,
                doc.data().community_banner,
                doc.data().community_introduction,
                doc.data().joined_identity
              )
            );
        });
      });

      //await db.collection('users').doc(userId).collection('communities').get()
        dispatch({
          type: SET_COMMUNITIES,
          communities: communities
        });
      
    };
  };

  export const createIdentity = (title, introduction, icon, banner) => {
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;
      const db = getFirestore()
      let newId;

      await addDoc(collection(db, `users/${userId}/communities`), {
        community_title: title,
        community_introduction: introduction,
        community_icon: icon,
        community_banner: banner
      }).then(async(ref) => {
        newId = ref.id
      })
  
      await setDoc(doc(db, `communities/${newId}`), {
        community_title: title,
        community_introduction: introduction,
        community_icon: icon,
        community_banner: banner
      });
  
      try {
        dispatch({
          type: CREATE_COMMUNITY,
          communityData: {
            id: newId,
            title: title,
            introduction: introduction,
            icon: icon,
            banner: banner
          }
        });
      } catch(err) {
        console.log(err);
        throw err;
      }
      
    };
  };
