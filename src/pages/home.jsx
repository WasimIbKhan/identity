import React,{useState, useEffect, useCallback} from 'react'
import * as identityAction from "../store/actions/identities";
import ReactLoading from "react-loading";
import { useSelector, useDispatch } from 'react-redux'

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);



const Home = () => {
    const dispatch = useDispatch();
    const identities = useSelector(state => state.identities.identities);
    const [isLoading, setLoading] = useState(true);
  
    const loadIdentities = useCallback(async () => {
      try {
        await dispatch(identityAction.fetchIdentities());
      } catch (error) {}
    }, [setLoading]);
  
    useEffect(() => {
      loadIdentities().then(() => {
        setLoading(false);
      });
    }, [loadIdentities]);

    if(isLoading) {
        return(
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
                <ReactLoading type={'spokes'} color={'black'} height={'20%'} width={'20%'}  />
            </div>
        )
    }
      return(
        <div>
        {identities.map((data, index) => (
        <div>{data.name}</div>
    ))}
    </div>
    )
};

export default Home;