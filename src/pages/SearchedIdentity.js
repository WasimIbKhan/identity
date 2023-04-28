import React, { useState, useEffect, useCallback } from "react";
import {getFirestore, setDoc, getDocs, getDoc, addDoc, doc, collection, updateDoc, where, query } from "firebase/firestore"; 
import { useSelector, useDispatch } from "react-redux";
import * as identityAction from "../store/actions/identities";
import * as postActions from "../store/actions/post";
import { useNavigate, useLocation } from "react-router-dom";
import "./persona.css";
import Identity from '../models/identity'
import Post from '../models/post'

const SearchedIdentity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const followerUserId = useSelector((state) => state.auth.userId)
  const userId = location.state.userId
  const currentIdentity = location.state.currentIdentity;
  const identities = useSelector(state => state.identities.identities)
  const publicIdentity = identities.find(identity => identity.isPublic == true)
  console.log(publicIdentity)

  const [follow, setFollow] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [searchedIdentities, setSearchedIdentities] = useState()
  const [posts, setPost] = useState()

  const loadIdentities = useCallback(async () => {
    const loadedIdentities = []
    try {
      const db = getFirestore()
      await getDocs(collection(db, `users/${userId}/identities`)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          loadedIdentities.push(
              new Identity(
                doc.id,
                doc.data().identity_name,
                doc.data().identity_type,
                doc.data().identity_image
              )
            );
        });
      })
      
    } catch (error) {}
    setSearchedIdentities(loadedIdentities)
  }, [setLoading]);

  const loadPosts = async () => {
    try {
      const loadedPosts = []
      const db = getFirestore()
      await getDocs(query(collection(db, "posts"), where("identity_id", "==", currentIdentity.id))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            loadedPosts.push(
                new Post(
                    doc.id,
                    doc.data().userId,
                    doc.data().identity_id,
                    doc.data().identity_name,
                    doc.data().identity_type,
                    doc.data().identity_image,
                    doc.data().postTitle,
                    doc.data().postMediaUri,
                    doc.data().postLabel,
                    doc.data().postTime,
                    doc.data().likes
                )
            );
        });
      })
      setPost(loadedPosts)
    } catch (err) {
      console.log(err.message);
    }
    return;
  };

  useEffect(() => {
    setLoading(true);
    loadIdentities().then(() => {
      setLoading(false);
      loadPosts()
      setLoading(false);
    });
  }, [loadIdentities]);

  const showPost = useCallback(async (post) => {
    navigate("/dashboard/identity/post", {
      state: { post: post },
    })
  });

  const followFunc = useCallback(async() => {
    const db = getFirestore()
    await setDoc(doc(db, `users/${userId}/follower_request/${followerUserId}`), {
      identity_id: publicIdentity.id,
      identity_name: publicIdentity.name,
      identity_type: publicIdentity.type,
      identity_image: publicIdentity.profileImage,
    });
    console.log('done')
  })

  return (
    <div style={{ display: "flex" }}>
      <div className="profile-info">
        <div className="bannerContainer">
          <div className="imageContainer">
            <img
              className="profile-image"
              src={currentIdentity.profileImage}
              alt="profile"
            />
          </div>
          <div className="nameContainer">
            <div className="profile-name-container">
              <div className="userName">{currentIdentity.name}</div>
              <div className="userPersonaType">{currentIdentity.type}</div>
            </div>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-label">Posts</span>
                <span className="stat-number">10</span>
              </div>
              <div className="profile-stat">
                <span className="stat-label">Followers</span>
                <span className="stat-number">100</span>
              </div>
              <div className="profile-stat">
                <span className="stat-label">Following</span>
                <span className="stat-number">50</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{color: follow? 'grey': 'white'}}>
        <button className="profile-edit-button" onClick={followFunc}>
            Follow
          </button>
        </div>
       
        <div className="profile-posts">
          <h2>Posts</h2>
          <div className="post">
            <div className="post-header">
              <h3 className="post-title">This is a Hybrid Post Title</h3>
              <div className="post-meta">
                <span className="post-date">2 hours ago</span>
              </div>
            </div>
            <div className="post-content">
              <div className="post-video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <p>
                This is the post content, it can contain text, images, or even
                videos.
              </p>
            </div>
          </div>
          {posts && posts.map((data, index) => (
            <div className="post" onClick={() => showPost(data)}>
              <div className="post-header" onClick={() => showPost(data)}>
                <h3 className="post-title">{data.postTitle}</h3>
                <div className="post-meta">
                </div>
              </div>
              <div className="post-content" onClick={() => showPost(data)}>
                <div className="post-video">
                  <iframe
                    width="560"
                    height="315"
                    src={"https://www.youtube.com/embed/jMwt9zOFX2I"}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p>{data.postLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchedIdentity;
