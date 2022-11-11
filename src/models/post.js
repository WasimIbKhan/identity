class Post {
    constructor(postId, userId, personaId, personaName, personaType, profileImage, postTitle, postMediaUri, postLabel, postTime, comments, isPublic) {
        this.postId = postId
        this.userId = userId
        this.personaId = personaId
        this.personaName = personaName
        this.personaType = personaType
        this.profileImage = profileImage
        this.postTitle = postTitle
        this.postMediaUri = postMediaUri
        this.postLabel = postLabel
        this.postTime = postTime
        this.comments = comments
        this.isPublic = isPublic
    }
}

export default Post;

