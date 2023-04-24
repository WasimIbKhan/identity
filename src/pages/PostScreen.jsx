import React,{useState} from "react";
import "./PostScreen.css";

import {useLocation } from "react-router-dom";
const PostScreen = () => {
  const location = useLocation();

  const [title, setTitle] = useState(location.state.post.postTitle);
  const [content, setContent] = useState(location.state.post.postLabel);
  const [media, setMedia] = useState(location.state.post.postMediaUri);

  return (
    <div className="post-screen-container">
      <div className="post-header">
        <h1 className="post-title">{title}</h1>
        <div className="post-meta">
          <span className="post-author">Posted by u/Username</span>
          <span className="post-date">2 hours ago</span>
        </div>
      </div>

      <div className="post-content">
        <div className="post-video">
          <iframe
            width="560"
            height="315"
            src={media}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p>
        {content}
        </p>
      </div>

      <div className="post-comments">
        <h2>Comments</h2>
        <div className="comment">
          <div className="comment-meta">
            <span className="comment-author">Comment by u/AnotherUsername</span>
            <span className="comment-date">1 hour ago</span>
          </div>
          <p>This is a comment on the post. It can contain text or images.</p>
        </div>
        <div className="comment">
          <div className="comment-meta">
            <span className="comment-author">
              Comment by u/YetAnotherUsername
            </span>
            <span className="comment-date">30 minutes ago</span>
          </div>
          <p>
            This is another comment on the post. It can also contain text or
            images.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
