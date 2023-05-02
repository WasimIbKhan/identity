import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import './EditIdentity.css';

import * as identityAction from "../store/actions/identities";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import {useNavigate, useLocation} from 'react-router-dom';

const CreateIdentity = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('')
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const uploadFile = async (file) => {
    try {
      const result = await Storage.put(file.name, file, { contentType: file.type });
      return result.key; // Return the key of the uploaded file
    } catch (error) {
      console.error('Error uploading file: ', error);
      return null;
    }
  }


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await uploadFile(file);
    const fileUri = `https://identity373ae11ef5764ad4baba9daf675bf7cc123614-dev.s3.eu-west-2.amazonaws.com/public/${file.name}`
    setProfileImage(fileUri)
  }


  const handleIdentityTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
    try {
      await dispatch(identityAction.createIdentity(name, type, profileImage, privacy))
    } catch (error) {
      console.log(error)
    }
    navigate('/dashboard/identity')
    setLoading(false)
  };


  if (isLoading) {
    return (
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <ReactLoading
          type={"spokes"}
          color={"black"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <h1>Create Identity</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>

        <div className="form-group">
          <label htmlFor="profileImage">Profile Image:</label>
          <input type="file" id="profileImage" onChange={handleFileChange} />
          {profileImage && <img src={profileImage} alt="Uploaded file" />}
        </div>

        <div className="form-group">
          <label>type:</label>
          <input type="text" id="identity-type" value={type} onChange={handleIdentityTypeChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <Switch onChange={() => setPrivacy(!privacy)} checked={privacy} />
        <div>{privacy}</div>
        <button type="submit">Create Identity</button>
      </form>
    </div>
  );
};

export default CreateIdentity;