import {getFirestore, getDoc, getDocs, addDoc, doc, collection, updateDoc } from "firebase/firestore"; 
import Identity from '../../models/identity'
export const DELETE_IDENTITY = 'DELETE_IDENTITY';
export const CREATE_IDENTITY = 'CREATE_IDENTITY';
export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';
export const SET_IDENTITIES = 'SET_IDENTITIES';


export const fetchIdentities = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    
    const userId = getState().auth.userId;
  
    const db = getFirestore()

    const loadedIdentities = [];
    
    await getDocs(collection(db, `users/${userId}/personas`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        loadedIdentities.push(
            new Identity(
              doc.id,
              doc.data().name,
              doc.data().type,
              doc.data().profileImage
            )
          );
      });
    })
    //await db.collection('users').doc(userId).collection('personas').get().

      dispatch({
        type: SET_IDENTITIES,
        identities: loadedIdentities
      });
    
  };
};


export const createIdentity = (name, type, profileImage) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const db = getFirestore()
    let newId;
    let personaImageUri
    await addDoc(collection(db, `users/${userId}/personas`)).add({
      name: name,
      type: type
    }).then(async(ref) => {
      newId = ref.id
    })

    db.collection('personas').doc(newId).set({
        userId: userId,
        personaId: newId,
        name: name,
        type: type,
        profileImage: personaImageUri
    })

    try {
      dispatch({
        type: CREATE_IDENTITY,
        identityData: {
          id: newId,
          name: name,
          type: type,
          profileImage: profileImage,
        }
      });
    } catch(err) {
      console.log(err);
      throw err;
    }
    
  };
};

