import React, { useState } from "react";
import "./IdentityBar.css";
import Modal from "react-modal";

function IdentityBar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const identities = props.identities;
  const currentIdentity = props.currentIdentity;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClickPersona = (identity) => {
    const newIndex = identities.indexOf(identity);
    props.onClickIdentity(newIndex);
    closeModal();
  };

  return (
    <div className="profile-top-bar">
      <div className="profile-name-container">
        <div>{currentIdentity.name}</div>
      </div>
      <div onClick={openModal}>
        <img
          className="profile-image"
          src={currentIdentity.profileImage}
          alt="profile"
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="profile-modal"
        contentLabel="Example Modal"
      >
        <div className="profile-modal">
          <div className="profile-modal-content">
            {props.identities.map((data, index) => (
              <div
                className="profile-icon"
                onClick={() => onClickPersona(data)}
              >
                <img src={data.profileImage} alt="Profile" />
                <div className="profile-info">
                  <h2>{data.name}</h2>
                  <p>{data.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default IdentityBar;
