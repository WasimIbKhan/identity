import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as identityAction from "../store/actions/identities";
import * as postActions from "../store/actions/post";
import { useNavigate } from "react-router-dom";
import "./persona.css";
const Identity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentIdentity = useSelector(
    (state) => state.identities.identities[state.identities.index]
  );
  const posts = useSelector((state) => state.posts.posts);
  console.log("step 3");
  console.log(posts);
  const [isLoading, setLoading] = useState(false);
  const loadIdentities = useCallback(async () => {
    try {
      await dispatch(identityAction.fetchIdentities());
    } catch (error) {}
  }, [setLoading]);

  const loadPosts = async () => {
    try {
      await dispatch(postActions.fetchPosts(currentIdentity.id));
    } catch (err) {
      console.log(err.message);
    }
    return;
  };

  useEffect(() => {
    setLoading(true);
    loadIdentities().then(() => {
      setLoading(false);
    });
  }, [loadIdentities]);

  useEffect(() => {
    setLoading(true);
    loadPosts().then(() => {
      setLoading(false);
    });
  }, [currentIdentity]);

  const updateIdentity = useCallback(async () => {
    navigate("/dashboard/identity/edit-identity", {
      state: { currentIdentity: currentIdentity },
    });
  });

  const createIdentity = useCallback(async () => {
    navigate("/dashboard/identity/create-identity");
  });

  const createPost = useCallback(async () => {
    navigate("/dashboard/identity/create-post", {
      state: { currentIdentity: currentIdentity },
    })
  });

  const showPost = useCallback(async (post) => {
    console.log(post)
    navigate("/dashboard/identity/post", {
      state: { post: post },
    })
  });
  return (
    <div style={{ display: "flex" }}>
      <div className="profile-info">
        <div className="bannerContainer">
          <div className="imageContainer" onClick={updateIdentity}>
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
        <div>
          <button className="profile-edit-button" onClick={createIdentity}>
            Create Identity
          </button>
          <button className="profile-edit-button" onClick={createPost}>
            Create Post
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
          {posts.map((data, index) => (
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

export default Identity;
