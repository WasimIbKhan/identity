import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as communityAction from '../store/actions/community'
import CommunityItem from '../components/CommunityItem'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import { useNavigate } from 'react-router-dom';

const Communtiy = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentIdentity = useSelector(
        (state) => state.identities.identities[state.identities.index]
    );
    const communities = useSelector(state => state.communities.communities.filter(community => community.joinedIdentity == currentIdentity.id))

    const [isLoading, setLoading] = useState(false)
    const [focus, setFocus] = useState(false)
    const loadCommunities = useCallback(async () => {
        try {
            await dispatch(communityAction.fetchCommunities())
        } catch (error) {
            console.log(error)
        }

    }, [setLoading])

    useEffect(() => {
        setLoading(true)
        loadCommunities().then(() => {
            setLoading(false)
        })
    }, [loadCommunities])

    const onClickCommunity = community => {
        navigate('/dashboard/community/community-screen', {
            state: {community: community}
        })
    }

    const onClickCreate = () => {
        navigate('/dashboard/community/create-community')
    }

    return (
        <div>
            <button className="profile-edit-button" onClick={onClickCreate}>
            Create Community
          </button>
          {focus && <InstantSearch searchClient={searchClient} indexName="USERS">
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>}
            {!focus && communities.map((data, index) => (
                <CommunityItem community={data} onClickCommunity={onClickCommunity} title={data.communityName} Icon={data.icon} banner={data.banner} />
            ))}
        </div>
    )
};

function Hit({ hit }) {
    const navigate = useNavigate()
        return (
          <div style={{marginLeft: '30px'}} onClick={() => fetchUserIdentity(hit, hit.objectID, navigate)}>
              <CommunityItem identity={hit}/>
          </div>
      );
    }

export default Communtiy;