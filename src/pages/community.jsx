import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as communityAction from '../store/actions/community'
import CommunityItem from '../components/CommunityItem'
const Communtiy = () => {
    const dispatch = useDispatch()
    const currentIdentity = useSelector(
        (state) => state.identities.identities[state.identities.index]
    );
    const communities = useSelector(state => state.communities.communities.filter(community => community.joinedIdentity == currentIdentity.id))

    const [isLoading, setLoading] = useState(false)

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

    return (
        <div>
            {communities.map((data, index) => (
                <CommunityItem title={data.communityName} Icon={data.icon} banner={data.banner} />
            ))}
        </div>
    )
};

export default Communtiy;