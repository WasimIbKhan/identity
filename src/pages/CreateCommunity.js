import React, { useState } from 'react';
import './CreateCommunity.css';
import { Storage } from 'aws-amplify';
import * as communityAction from '../store/actions/community'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateCommunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate() 

  const [title, setTitle] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [banner, setBanner] = useState("")
  const [icon, setIcon] = useState("")

  const [isLoading, setLoading] = useState(false)
  const uploadFile = async (file) => {
    try {
      const result = await Storage.put(file.name, file, { contentType: file.type });
      return result.key; // Return the key of the uploaded file
    } catch (error) {
      console.error('Error uploading file: ', error);
      return null;
    }
  }
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  const handleBannerChange = async(event) => {
    const file = event.target.files[0];
    await uploadFile(file);
    const fileUri = `https://identity373ae11ef5764ad4baba9daf675bf7cc123614-dev.s3.eu-west-2.amazonaws.com/public/${file.name}`
    setBanner(fileUri)
  }
  const handleIconChange = async(event) => {
    const file = event.target.files[0];
    await uploadFile(file);
    const fileUri = `https://identity373ae11ef5764ad4baba9daf675bf7cc123614-dev.s3.eu-west-2.amazonaws.com/public/${file.name}`
    setIcon(fileUri)
  }

  const handleSubmit = async(event) => {
    setLoading(true)
    try {
        await dispatch(communityAction.createCommunity(title, introduction, icon, banner))
    } catch (error) {
        
    }
    setLoading(false)
    navigate("/dashboard/community")
    event.preventDefault();
  };

  if(isLoading) {
    return(
      <div>loading...</div>
    )
  }
  return (
    <form className="communityForm" onSubmit={handleSubmit}>
      <h2 className="formTitle">{"Create Community"}</h2>
      <div className="formGroup">
        <label htmlFor="communityName">Community Name</label>
        <input type="text" id="communityName" name="communityName" value={title} onChange={handleTitleChange} required />
      </div>
      <div className="formGroup">
        <label htmlFor="introduction">Introduction</label>
        <textarea id="introduction" name="introduction" rows="3" value={introduction} onChange={handleIntroductionChange} required />
      </div>
      <div className="formGroup">
        <label htmlFor="banner">Banner Image URL</label>
        <input
          className="post-form-file"
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
        />
          {banner && <img src={banner} alt="Uploaded file" />}
      </div>
      <div className="formGroup">
        <label htmlFor="icon">Icon Image URL</label>
        <input
          className="post-form-file"
          type="file"
          accept="image/*"
          onChange={handleIconChange}
        />
          {banner && <img src={icon} alt="Uploaded file" />}
      </div>
      <div className="buttonGroup">
        <button type="submit">{"Create Community"}</button>
      </div>
    </form>
  );
};

export default CreateCommunity;
