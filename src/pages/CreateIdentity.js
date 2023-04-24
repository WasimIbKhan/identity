import React, { useState } from 'react';
import './EditProfile.css';

import * as identityAction from "../store/actions/identities";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";

import {useNavigate, useLocation} from 'react-router-dom';

const CreateIdentity = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/4705658.png&w=350&h=254');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setLoading] = useState(false)
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfileImageChange = (event) => {
    setProfileImage('https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/4705658.png&w=350&h=254');
  };

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
      await dispatch(identityAction.createIdentity(name, type, profileImage))
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
          <input type="file" id="profileImage" onChange={handleProfileImageChange} />
        </div>

        <div className="form-group">
          <label>type:</label>
          <input type="text" id="identity-type" value={type} onChange={handleIdentityTypeChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <button type="submit">Create Identity</button>
      </form>
    </div>
  );
};

export default CreateIdentity;