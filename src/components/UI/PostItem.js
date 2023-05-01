import React from 'react';

const PostItem = (props) => {
    return (
        <div className="post" onClick={() => props.showPost(props.post)}>
            <div className="post-header" onClick={() => props.showPost(props.post)}>
                <h3 className="post-title">{props.post.postTitle}</h3>
                <div className="post-meta">
                </div>
            </div>
            <div className="post-content" onClick={() => props.showPost(props.post)}>
                <div className="post-video">
                    <iframe
                        width="560"
                        height="315"
                        src={props.post.postMediaUri}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <p>{props.post.postLabel}</p>
            </div>
        </div>

    );
}

export default PostItem;
