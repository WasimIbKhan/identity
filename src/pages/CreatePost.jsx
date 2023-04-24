import React, { useState } from "react";
import "./CreatePost.css";
import * as postActions from "../store/actions/post";
import { useDispatch } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        postActions.createPost(
          location.state.currentIdentity,
          title,
          image,
          content,
          new Date(),
          0
        )
      );
    } catch (error) {
      console.log(error);
    }
    navigate("/dashboard/identity");
    setLoading(false);
  };
  return (
    <div className="post-page-container">
      <h1 className="post-page-title">Create a New Post</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <label className="post-form-label">Title:</label>
        <input
          className="post-form-input"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <label className="post-form-label">Content:</label>
        <textarea
          className="post-form-textarea"
          value={content}
          onChange={handleContentChange}
          required
        />
        <label className="post-form-label">Image:</label>
        <input
          className="post-form-file"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="post-form-submit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostPage;
