import {getFirestore, setDoc, getDocs, addDoc, doc, collection, updateDoc, query, where } from "firebase/firestore"; 
import Post from '../../models/post'

export const SET_PERSONA_POST = "SET_PERSONA_POST";
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';



export const fetchPosts = identity_id => {
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;
      let loadedPosts = []
    //users/${userId}/identities${identity_id}/posts
      const db = getFirestore()
      await getDocs(query(collection(db, "posts"), where("identity_id", "==", identity_id))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            loadedPosts.push(
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

        dispatch({
          type: SET_PERSONA_POST,
          posts: loadedPosts
        });
    };
  };

  export const createPost =  (identity, postTitle, postMedia, postLabel, postTime, likes) => {
    return async (dispatch, getState) => {

    const userId = getState().auth.userId;
    const db = getFirestore()
    let postId;

      await addDoc(collection(db, `posts`), {
        userId: userId,
        identity_id: identity.id,
        identity_name: identity.name,
        identity_type: identity.type,
        identity_image: identity.profileImage,
        postTitle: postTitle,
        postMediaUri: postMedia,
        postLabel: postLabel !== ''?  postLabel: '',
        postTime: postTime.toString(),
        likes: likes
      }).then(async(ref) => {
        postId = ref.id
      })

      await setDoc(doc(db, `users/${userId}/identities/${identity.id}/posts/${postId}`), {
        userId: userId,
        identity_id: identity.id,
        identity_name: identity.name,
        identity_type: identity.type,
        identity_image: identity.profileImage,
        postTitle: postTitle,
        postMediaUri: postMedia,
        postLabel: postLabel !== ''?  postLabel: '',
        postTime: postTime.toString(),
        likes: likes
      });

      try {
        dispatch({
          type: CREATE_POST,
          postData: {
            id: postId,
            userId: userId,
            identity_id: identity.id,
            identity_name: identity.name,
            identity_type: identity.type,
            identity_image: identity.profileImage,
            postTitle,
            postMediaUri: postMedia,
            postLabel,
            postTime,
            likes
          }
        });
      } catch(err) {
        console.log(err);
        throw err;
      }
    };
  };
  