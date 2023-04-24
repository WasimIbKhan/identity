class Post {
    constructor(postId, userId, identityId, identity_name, identity_type, identity_image, postTitle, postMediaUri, postLabel, postTime, likes) {
        this.postId = postId
        this.userId = userId
        this.identityId = identityId
        this.identity_name = identity_name
        this.identity_type = identity_type
        this.identity_image = identity_image
        this.postTitle = postTitle
        this.postMediaUri = postMediaUri
        this.postLabel = postLabel
        this.postTime = postTime
        this.likes = likes
    }
}

export default Post;

