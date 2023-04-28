class User {
    constructor(id, name, profileImage, follower, following, identities) {
        this.id = id
        this.name = name
        this.profileImage = profileImage
        this.follower = follower
        this.following = following
        this.identities = identities
    }
}

export default User