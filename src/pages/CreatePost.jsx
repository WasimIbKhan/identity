import React, { useState, useCallback } from "react";
import "./CreatePost.css";
import * as postActions from "../store/actions/post";
import { useDispatch } from "react-redux";
import { Storage } from 'aws-amplify';

import { useNavigate, useLocation } from "react-router-dom";
function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = async(event) => {
    const file = event.target.files[0];
    await uploadFile(file);
    const fileUri = `https://identity373ae11ef5764ad4baba9daf675bf7cc123614-dev.s3.eu-west-2.amazonaws.com/public/${file.name}`
    setImage(fileUri)
  }

  const uploadFile = async (file) => {
    try {
      const result = await Storage.put(file.name, file, { contentType: file.type });
      return result.key; // Return the key of the uploaded file
    } catch (error) {
      console.error('Error uploading file: ', error);
      return null;
    }
  }

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
        {image && <img src={image} alt="Uploaded file" />}
        <button className="post-form-submit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostPage;
