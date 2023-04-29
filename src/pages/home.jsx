import React,{useState, useEffect, useCallback} from 'react'
import * as homeAction from "../store/actions/home";
import ReactLoading from "react-loading";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.home.posts);
    console.log(posts)
    const [isLoading, setLoading] = useState(true);
  
    const loadIdentities = useCallback(async () => {
      try {
        await dispatch(homeAction.fetchPosts());
      } catch (error) {}
    }, [setLoading]);
  
    useEffect(() => {
      setLoading(true)
      loadIdentities().then(() => {
        setLoading(false);
      });
    }, [dispatch, loadIdentities]);

    if(isLoading) {
        return(
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
                <ReactLoading type={'spokes'} color={'black'} height={'20%'} width={'20%'}  />
            </div>
        )
    }

    const showPost = async(post) => {
      navigate("/dashboard/identity/post", {
        state: { post: post },
      })
    };

    if(isLoading) {
      return(
        <div>Loading..</div>
      )
    }
    if(posts.length == 0) {
      return(
        <div>Loading..</div>
      )
    }
      return(
        <div>
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
    )
};

export default Home;