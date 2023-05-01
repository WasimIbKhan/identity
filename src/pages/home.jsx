import React,{useState, useEffect, useCallback} from 'react'
import * as homeAction from "../store/actions/home";
import ReactLoading from "react-loading";
import PostItem from '../components/UI/PostItem';
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
            <PostItem post={data} showPost={showPost}/>
          ))}
    </div>
    )
};

export default Home;