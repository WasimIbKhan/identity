import {
    SET_POST,
} from '../actions/home'

const initialState = {
    allPosts: [],
    updatedPosts: [],
    likedPosts: [],
    savedPosts: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_POST:
            const personaRelationshipPosts = (action.personaRelationshipPosts).sort((a, b) => {
                var dateA = new Date(a.postTime), dateB = new Date(b.postTime)
                return dateB - dateA
            });
            const communityPost = (action.communityPost).sort((a, b) => {
                var dateA = new Date(a.postTime), dateB = new Date(b.postTime)
                return dateB - dateA
            });
            const followingsPost = (action.followingsPost).sort((a, b) => {
                var dateA = new Date(a.postTime), dateB = new Date(b.postTime)
                return dateB - dateA
            });
            let allPosts = [...personaRelationshipPosts, ...communityPost, ...followingsPost]
            
            allPosts = allPosts.map(post => {
                if((action.likedPosts).includes(post.postId)) {
                    post['isLiked'] = true
                    return post
                } else {
                    post['isLiked'] = false
                    return post
                }
            })
            allPosts = allPosts.map(post => {
                if((action.savedPosts).includes(post.postId)) {
                    post['isSaved'] = true
                    return post
                } else {
                    post['isSaved'] = false
                    return post
                }
            })
            
              allPosts.map(homePost => {
                  (action.viewedPosts).some(viewedPost => {
                      if(homePost.postId === viewedPost) {
                        allPosts.push(allPosts.splice(allPosts.indexOf(homePost), 1)[0]);
                      }
                  })
              })
            return {
                ...state,
                allPosts: allPosts,
                likedPosts: action.likedPosts,
                savedPosts: state.savedPosts
            }
        }
        return state;
    }