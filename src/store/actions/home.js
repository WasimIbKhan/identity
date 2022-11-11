export const SET_POST = "SET_POST"
export const LIKE = 'LIKE'
export const UNLIKE = 'UNLIKE'
export const SAVE = "SAVE"
export const UNSAVE = "UNSAVE"
export const UPDATE_POSTS = "UPDATE_POSTS"


import * as firebase from 'firebase'
import 'firebase/firestore'

import Post from '../../models/post'
import Repost from '../../models/repost'
import Community from '../../models/community'

export const fetchPosts = () => {
    return async (dispatch, getState) => {
      const db = firebase.firestore()
      const userId = getState().auth.userId
      const likedPosts = getState().auth.likedPosts
      const savedPosts = getState().auth.savedPosts
      let reposts = []
      let personaRelationshipPosts = []
      let joinedCommunityPosts = []
      let followingsPost = []

      let personaIds = []
      let correspondingPersonaIds = []
      let repostIds = []
      let communityIds = []
      let correspondingCommunityPersonaIds = []

      const viewedPosts = []
      let communities = []
      let batch = []
      await db.collection('users').doc(userId).collection('Home').where("priority", '==', 1).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          personaIds.push(doc.data().personaId);
          correspondingPersonaIds.push({
            personaId: doc.data().personaId,
            priority: doc.data().priority,
            correspondingPersonaId: doc.data().correspondingPersonaId
          })
        });
      })
      
      if(personaIds.length !== 0 ) {
          if(personaIds.length >= 10 ) {
            while(personaIds.length) {
              batch = personaIds.splice(0, 10)
              if(batch.length == 0) break
              console.log("persona relationships reposts greater then 10")
              await db.collection('reposts').where("personaId", "in", [...batch]).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  repostIds.push(doc.data().postId)
                  reposts.push(
                      new Repost(
                        doc.id,
                        doc.data().postId,
                        doc.data().userId,
                        doc.data().personaId,
                        doc.data().personaName,
                        doc.data().personaType,
                        doc.data().profileImage
                      )
                    );
                });
              });
            }
          } else {
            console.log("persona relationships less then 10")
            await db.collection('reposts').where("personaId", "in", personaIds).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                repostIds.push(doc.data().postId)
                reposts.push(
                    new Repost(
                      doc.id,
                      doc.data().postId,
                      doc.data().userId,
                      doc.data().personaId,
                      doc.data().personaName,
                      doc.data().personaType,
                      doc.data().profileImage
                    )
                  );
              });
            });
        }
        
        if(repostIds.length !== 0) {
          if(repostIds.length >= 10) {
            while(repostIds.length) {
              batch = repostIds.splice(0, 10)
              if(batch.length == 0) break
              console.log("persona relationship reposts greater then 10")
              await db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "in", [...batch]).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  personaRelationshipPosts.push(
                      new Post(
                        doc.id,
                        doc.data().userId,
                        doc.data().personaId,
                        doc.data().personaName,
                        doc.data().personaType,
                        doc.data().profileImage,
                        doc.data().postTitle,
                        doc.data().postMediaUri,
                        doc.data().postLabel,
                        doc.data().postTime,
                        doc.data().likes,
                        doc.data().reposts,
                        doc.data().comments,
                        doc.data().isPublic,
                        doc.data().canRepost,
                        true,
                        doc.data().privacy,
                        doc.data().isCommunityPost,
                        doc.data().communityId,
                        doc.data().communityName,
                        doc.data().communityIcon,
                        ""
                      )
                    );
                });
              });
            }
          } else {
            console.log("persona relationships reposts less then 10")
            await db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "in", repostIds).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                personaRelationshipPosts.push(
                    new Post(
                      doc.id,
                      doc.data().userId,
                      doc.data().personaId,
                      doc.data().personaName,
                      doc.data().personaType,
                      doc.data().profileImage,
                      doc.data().postTitle,
                      doc.data().postMediaUri,
                      doc.data().postLabel,
                      doc.data().postTime,
                      doc.data().likes,
                      doc.data().reposts,
                      doc.data().comments,
                      doc.data().isPublic,
                      doc.data().canRepost,
                      true,
                      doc.data().privacy,
                      doc.data().isCommunityPost,
                      doc.data().communityId,
                      doc.data().communityName,
                      doc.data().communityIcon,
                      ""
                    )
                  );
              });
            });
          }
          
          
          personaRelationshipPosts.map(post => {
            (reposts).some(repost => {
              if(repost.postId === post.postId) {
                post['repostPersonaId'] = repost.personaId
                post['repostPersonaName'] = repost.personaName
                post['repostPersonaType'] = repost.personaType
                post['repostProfileImage'] = repost.profileImage
              }
            })
          })
          personaRelationshipPosts.map(post => {
            (correspondingPersonaIds).some(persona => {
                if(persona.personaId === post.personaId) {
                  post['correspondingPersona'] = persona.correspondingPersonaId
                  post['priority'] = persona.priority
                }
                else if(persona.personaId === post.repostPersonaId) {
                  post['correspondingPersona'] = persona.correspondingPersonaId
                  post['priority'] = persona.priority
                }
            })
          })
        }
        if(personaIds !==0) {
          if(personaIds.length >= 10) {
            while(personaIds.length){
              batch = personaIds.splice(0, 10)
              if(batch.length == 0) break
              console.log("persona relationships posts greater then 10")
              await db.collection('posts').where("personaId", "in", [...batch]).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  personaRelationshipPosts.push(
                      new Post(
                        doc.id,
                        doc.data().userId,
                        doc.data().personaId,
                        doc.data().personaName,
                        doc.data().personaType,
                        doc.data().profileImage,
                        doc.data().postTitle,
                        doc.data().postMediaUri,
                        doc.data().postLabel,
                        doc.data().postTime,
                        doc.data().likes,
                        doc.data().reposts,
                        doc.data().comments,
                        doc.data().isPublic,
                        doc.data().canRepost,
                        false,
                        doc.data().privacy,
                        doc.data().isCommunityPost,
                        doc.data().communityId,
                        doc.data().communityName,
                        doc.data().communityIcon
                        )
                    );
                });
              })
            }
          } else {
            console.log("persona relationships posts less then 10")
            await db.collection('posts').where("personaId", "in", personaIds).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                personaRelationshipPosts.push(
                    new Post(
                      doc.id,
                      doc.data().userId,
                      doc.data().personaId,
                      doc.data().personaName,
                      doc.data().personaType,
                      doc.data().profileImage,
                      doc.data().postTitle,
                      doc.data().postMediaUri,
                      doc.data().postLabel,
                      doc.data().postTime,
                      doc.data().likes,
                      doc.data().reposts,
                      doc.data().comments,
                      doc.data().isPublic,
                      doc.data().canRepost,
                      false,
                      doc.data().privacy,
                      doc.data().isCommunityPost,
                      doc.data().communityId,
                      doc.data().communityName,
                      doc.data().communityIcon
                      )
                  );
              });
            });
          }
        }
        
      }
      personaRelationshipPosts.map(post => {
        (correspondingPersonaIds).some(persona => {
            if(persona.personaId === post.personaId) {
              post['correspondingPersona'] = persona.correspondingPersonaId
              post['priority'] = persona.priority
            }
        })
      })

    await db.collection('users').doc(userId).collection('communities').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        communityIds.push(doc.id)
        correspondingCommunityPersonaIds.push({
          communityId: doc.id,
          personaId: doc.data().personaId
        })
      });
    });

    if(communityIds.length !== 0 ) {
      if(communityIds >= 10) {
        while(communityIds.length ) {
          batch = communityIds.splice(0, 10)
          console.log("community posts greater then 10")
          if(batch.length == 0) break
          await db.collection('posts').where("communityId", "in", [...batch]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              joinedCommunityPosts.push(
                  new Post(
                    doc.id,
                    doc.data().userId,
                    doc.data().personaId,
                    doc.data().personaName,
                    doc.data().personaType,
                    doc.data().profileImage,
                    doc.data().postTitle,
                    doc.data().postMediaUri,
                    doc.data().postLabel,
                    doc.data().postTime,
                    doc.data().likes,
                    doc.data().reposts,
                    doc.data().comments,
                    doc.data().isPublic,
                    doc.data().canRepost,
                    false,
                    doc.data().privacy,
                    true,
                    doc.data().communityId,
                    doc.data().communityName,
                    doc.data().communityIcon
                  )
                );
            });
        });
      }
      } else {
        console.log("community posts less then 10")
        await db.collection('posts').where("communityId", "in", communityIds).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            joinedCommunityPosts.push(
                new Post(
                  doc.id,
                  doc.data().userId,
                  doc.data().personaId,
                  doc.data().personaName,
                  doc.data().personaType,
                  doc.data().profileImage,
                  doc.data().postTitle,
                  doc.data().postMediaUri,
                  doc.data().postLabel,
                  doc.data().postTime,
                  doc.data().likes,
                  doc.data().reposts,
                  doc.data().comments,
                  doc.data().isPublic,
                  doc.data().canRepost,
                  false,
                  doc.data().privacy,
                  true,
                  doc.data().communityId,
                  doc.data().communityName,
                  doc.data().communityIcon
                )
              );
          });
        })
      }
     
    }
    joinedCommunityPosts.map(post => {
      correspondingCommunityPersonaIds.some(persona => {
        if(persona.communityId === post.communityId) {
          post['correspondingPersona'] = persona.personaId
          post['priority'] = 2
        } 
      })
    })
    personaIds = []
    correspondingPersonaIds= []
    reposts = []
    repostIds = []
    await db.collection('users').doc(userId).collection('Home').where("priority", '==', 3).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        personaIds.push(doc.data().personaId);
        correspondingPersonaIds.push({
          personaId: doc.data().personaId,
          priority: doc.data().priority,
          correspondingPersonaId: doc.data().correspondingPersonaId
        })
      });
    })
    

    if(personaIds.length !== 0 ) {
      if(personaIds.length >= 10) {
        console.log("followers reposts greater then 10")
        while(personaIds.length) {
          batch = personaIds.splice(0, 10)
          if(batch.length == 0) break
          await db.collection('reposts').where("personaId", "in", [...batch]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              repostIds.push(doc.data().postId)
              reposts.push(
                  new Repost(
                    doc.id,
                    doc.data().postId,
                    doc.data().userId,
                    doc.data().personaId,
                    doc.data().personaName,
                    doc.data().personaType,
                    doc.data().profileImage
                  )
                );
            });
          });
        }
      } else {
        console.log("community reposts less then 10")
        if(personaIds.length !== 0) {
          await db.collection('reposts').where("personaId", "in", personaIds).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              repostIds.push(doc.data().postId)
              reposts.push(
                  new Repost(
                    doc.id,
                    doc.data().postId,
                    doc.data().userId,
                    doc.data().personaId,
                    doc.data().personaName,
                    doc.data().personaType,
                    doc.data().profileImage
                  )
                );
            });
          });
        }
        
      }
      
      if(repostIds.length!==0 ) {
        if(repostIds.length >=10) {
          console.log("followers reposts greater then 10")
          while(repostIds.length) {
            batch = repostIds.splice(0, 10)
            if(batch.length == 0) break
            await db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "in", [...batch]).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                followingsPost.push(
                    new Post(
                      doc.id,
                      doc.data().userId,
                      doc.data().personaId,
                      doc.data().personaName,
                      doc.data().personaType,
                      doc.data().profileImage,
                      doc.data().postTitle,
                      doc.data().postMediaUri,
                      doc.data().postLabel,
                      doc.data().postTime,
                      doc.data().likes,
                      doc.data().reposts,
                      doc.data().comments,
                      doc.data().isPublic,
                      doc.data().canRepost,
                      true,
                      doc.data().privacy,
                      doc.data().isCommunityPost,
                      doc.data().communityId,
                      doc.data().communityName,
                      doc.data().communityIcon,
                      ""
                    )
                  );
              });
            })
          }
        } else {
          console.log("followers reposts less then 10")
          await db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "in", repostIds).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              followingsPost.push(
                  new Post(
                    doc.id,
                    doc.data().userId,
                    doc.data().personaId,
                    doc.data().personaName,
                    doc.data().personaType,
                    doc.data().profileImage,
                    doc.data().postTitle,
                    doc.data().postMediaUri,
                    doc.data().postLabel,
                    doc.data().postTime,
                    doc.data().likes,
                    doc.data().reposts,
                    doc.data().comments,
                    doc.data().isPublic,
                    doc.data().canRepost,
                    true,
                    doc.data().privacy,
                    doc.data().isCommunityPost,
                    doc.data().communityId,
                    doc.data().communityName,
                    doc.data().communityIcon,
                    ""
                  )
                );
            });
          })
        }
        
          followingsPost.map(post => {
            (reposts).some(repost => {
              if(repost.postId === post.postId) {
                post['repostPersonaId'] = repost.personaId
                post['repostPersonaName'] = repost.personaName
                post['repostPersonaType'] = repost.personaType
                post['repostProfileImage'] = repost.profileImage
              }
            })
          })
        
        
      }
      
      if(personaIds.length !==0) {
        if(personaIds.length >= 10) {
          while(personaIds.length) {
            console.log("followers posts greater then 10")
            batch = personaIds.splice(0, 10)
            if(batch.length == 0) break
            await db.collection('posts').where("personaId", "in", [...batch]).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                followingsPost.push(
                    new Post(
                      doc.id,
                      doc.data().userId,
                      doc.data().personaId,
                      doc.data().personaName,
                      doc.data().personaType,
                      doc.data().profileImage,
                      doc.data().postTitle,
                      doc.data().postMediaUri,
                      doc.data().postLabel,
                      doc.data().postTime,
                      doc.data().likes,
                      doc.data().reposts,
                      doc.data().comments,
                      doc.data().isPublic,
                      doc.data().canRepost,
                      false,
                      doc.data().privacy,
                      doc.data().isCommunityPost,
                      doc.data().communityId,
                      doc.data().communityName,
                      doc.data().communityIcon
                    )
                  );
              });
            });
          }
        } else {
          console.log("followers posts less then 10")
            console.log(personaIds)
          await db.collection('posts').where("personaId", "in", personaIds).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              followingsPost.push(
                  new Post(
                    doc.id,
                    doc.data().userId,
                    doc.data().personaId,
                    doc.data().personaName,
                    doc.data().personaType,
                    doc.data().profileImage,
                    doc.data().postTitle,
                    doc.data().postMediaUri,
                    doc.data().postLabel,
                    doc.data().postTime,
                    doc.data().likes,
                    doc.data().reposts,
                    doc.data().comments,
                    doc.data().isPublic,
                    doc.data().canRepost,
                    false,
                    doc.data().privacy,
                    doc.data().isCommunityPost,
                    doc.data().communityId,
                    doc.data().communityName,
                    doc.data().communityIcon
                  )
                );
            });
          });
        }
        
        }
      }
      
     
    followingsPost.map(post => {
      (correspondingPersonaIds).some(persona => {
          if(persona.personaId === post.personaId) {
            post['correspondingPersona'] = persona.correspondingPersonaId
            post['priority'] = persona.priority
          }
          else if(persona.personaId === post.repostPersonaId) {
            post['correspondingPersona'] = persona.correspondingPersonaId
            post['priority'] = persona.priority
          }
      })
    })

    dispatch({
      type: SET_POST,
      personaRelationshipPosts: personaRelationshipPosts,
      communityPost: joinedCommunityPosts,
      followingsPost: followingsPost,
      likedPosts: likedPosts,
      savedPosts: savedPosts,
      viewedPosts: viewedPosts
      });
    };
  };
  
  export const updatePosts = personaId => {
    return {
      type: UPDATE_POSTS,
      personaId: personaId
    }
  }
  
 