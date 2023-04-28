import {getFirestore, setDoc, getDocs, getDoc, addDoc, doc, collection, updateDoc, where, query } from "firebase/firestore"; 
import {getStorage} from 'firebase/storage'

import Identity from '../../models/identity'

export const DELETE_IDENTITY = 'DELETE_IDENTITY';
export const CREATE_IDENTITY = 'CREATE_IDENTITY';
export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';
export const SET_IDENTITIES = 'SET_IDENTITIES';
export const CHOOSE_IDENTITY = 'CHOOSE_IDENTITY'

export const fetchIdentities = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const db = getFirestore()
    const loadedIdentities = [];
    
    await getDocs(collection(db, `users/${userId}/identities`)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        loadedIdentities.push(
            new Identity(
              doc.id,
              doc.data().identity_name,
              doc.data().identity_type,
              doc.data().identity_image,
              doc.data().is_main_identity
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
    console.log(name)
    console.log(type)
    const newUri = uploadFile(profileImage)
    console.log(newUri)
    await addDoc(collection(db, `users/${userId}/identities`), {
      identity_name: name,
      identity_type: type,
      identity_image: profileImage,
      is_main_identity: false
    }).then(async(ref) => {
      newId = ref.id
    })

    await setDoc(doc(db, `identities/${newId}`), {
      userId: userId,
      identity_name: name,
      identity_type: type,
      identity_image: profileImage,
      is_main_identity: false
    });

    try {
      dispatch({
        type: CREATE_IDENTITY,
        identityData: {
          id: newId,
          name: name,
          type: type,
          profileImage: profileImage
        }
      });
    } catch(err) {
      console.log(err);
      throw err;
    }
    
  };
};

export const updateIdentity = (identityId, name, type, profileImage, isPublic) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const db = getFirestore()
    await updateDoc(doc(db, `users/${userId}/identities/${identityId}`), {
      identity_name: name,
      identity_type: type,
      identity_image: profileImage,
    })

    await updateDoc(doc(db, `identities/${identityId}`), {
      identity_name: name,
      identity_type: type,
      identity_image: profileImage,
    })

    if(isPublic) {
      await updateDoc(doc(db, `users/${userId}`), {
        name: name,
        type: type,
        profileImage: profileImage
      })
    }

    try {
      dispatch({
        type: UPDATE_IDENTITY,
        identityData: {
          id: identityId,
          name: name,
          type: type,
          identity_image: profileImage
        }
      });
    } catch(err) {
      console.log(err);
      throw err;
    }
    
  };
};

export const fetchUserIdentity = async(userId) => {
  const db = getFirestore()
  
  let user;
  console.log(userId)
  const q = await query(collection(db, "identities"), where("identity_type", "==", "Public"), where("userId", "==", userId))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    user = new Identity(
        doc.id,
        doc.data().identity_name,
        doc.data().identity_type,
        doc.data().identity_image
      )
  });
  console.log(user)
}

export const chooseIdentity = index => {
  return {
    type: CHOOSE_IDENTITY,
    index: index
  }
}

const UploadProfileImage = async (uri) => {
  console.log(uri)
  const response = await fetch(uri, { method: 'HEAD' });
  const mimeType = response.headers.get('content-type');
  const blob = await response.blob();
  const filename = guidGenerator() + '.' + get_url_extension(uri)
  await Storage.put(filename, blob, {
    contentType: mimeType
  })
  return
}

const removeFile = async(mediaUri) => {
  const filename = mediaUri.split('/').pop();
  try{
    Storage.remove(filename);
  } catch(err) {
    console.log(err)
  }
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


const UploadProfileImageBeta = async(uid, uri) => {
  const storage = getStorage()
  const ref = ref(storage, 'uid');

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    
    const snapshot = await ref.put(blob);
    
    blob.close();
    const imgUrl = await snapshot.ref.getDownloadURL();
    return imgUrl;
}

const uploadFile = async (fileData) => {
  try {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    console.log(21, result);
  } catch (error) {
    console.log(error)
  }
  
  const fileUri = `https://harmony-webs-persona-aws.s3.eu-west-2.amazonaws.com/profile_images/${fileData.name}`

};