import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as communityAction from '../store/actions/community'
import CommunityItem from '../components/CommunityItem'
import CommunityHitItem from '../components/CommunityHitItem'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Community from '../models/community'
import { useNavigate } from 'react-router-dom';

const searchClient = algoliasearch('6VHY9J9IO1', 'e9bf5584609fa3675766219c3261b1fa');

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
            state: { community: community }
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
            {!focus && communities.map((data, index) => (
                <CommunityItem community={data} onClickCommunity={onClickCommunity} title={data.communityName} Icon={data.icon} banner={data.banner} />
            ))}  
            <InstantSearch searchClient={searchClient} indexName="COMMUNITIES">
                <SearchBox onSubmit={() => setFocus(!focus)} />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </div>
    )
};

function Hit({ hit }) {
    const navigate = useNavigate()
    const community = new Community(
        hit.objectID,
        hit.communityName,
        hit.icon,
        hit.banner,
        hit.introduction
    )

    return (
        <div style={{ marginLeft: '30px' }} onClick={() =>  navigate('/dashboard/community/community-screen', {
            state: { community: community }
        })}>
            <CommunityHitItem community={hit} />
        </div>
    );
}

async function naviagteScreen() {

}

export default Communtiy;