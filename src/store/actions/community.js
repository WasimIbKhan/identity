import {getFirestore, getDoc, getDocs, collection } from "firebase/firestore"; 
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
      
      await getDocs(collection(db, `communities`)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            communities.push(
              new Community(
                doc.id,
                doc.data().moderatorId,
                doc.data().moderatorName,
                doc.data().moderatorProfileImage,
                doc.data().communityName,
                doc.data().icon,
                doc.data().banner,
                doc.data().introduction,
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
  
 
  

  const UploadFile = async (uri, type) => {
    const response = await fetch(uri);

      const blob = await response.blob();
      const filename = guidGenerator() + '.' + get_url_extension(uri)
      await Storage.put(filename, blob, {
        contentType: type
      })
      const fileUri = `https://persona3a11617d90a54a5eb4a964f5925e09ba93856-dev.s3.eu-west-2.amazonaws.com/public/${filename}`
      return fileUri
  }

  function get_url_extension( url ) {
    return  url.split(/[#?]/)[0].split('.').pop().trim();
}

  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const removeFile = async(mediaUri) => {
  console.log('is this an error?? => ' + mediaUri)
  const filename = mediaUri.split('/').pop();
  try{
    Storage.remove(filename);
  } catch(err) {
    console.log(err)
  }
}