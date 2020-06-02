import React, {createContext, useEffect, useState} from 'react';
import Axios from 'axios';
import {buildAuthorizationHeader} from '../auth';
import {useParams} from 'react-router-dom';

export const ProfileContext = createContext(false);

export const ProfileProvider = ({children}) => {

    const {id} = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);

    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (loading || id !== data.info.user_id) {
            Axios.get(profileEndPoint(), buildAuthorizationHeader()).then(res => {
                // console.log(res.data);
                setData(res.data);
                setFollowers(res.data.info.follower_count);
                setFollowing(res.data.info.following_count);
                setIsFollowing(res.data.info.is_following);
                setLoading(false)
            }).catch(err => console.log(err));
        }
    }, [id, loading])

    /**
     * Builds the endpoint to retrieve information on the profile.
     * If an ID is specifically provided then load the profile for that ID,
     * otherwise, load the profile for the current user.
     */
    const profileEndPoint = () => {
        let profileEndPoint = '/api/profile.php';
        if (id !== undefined) {
            profileEndPoint = `${profileEndPoint}?id=${id}`;
        }

        return profileEndPoint;
    }

    /**
     * After following a user.
     */
    const onFollow = (followType) => {
        if (followType === 'unfollow') {
            setFollowers(followers - 1);
            setIsFollowing(false);
        } else {
            setFollowers(followers + 1);
            setIsFollowing(true);
        }
    }

    const providerValues = {
        id, data, loading,
        followers, following, isFollowing,
        profileEndPoint,
        onFollow
    }

    return (
        <ProfileContext.Provider value={providerValues}>
            {children}
        </ProfileContext.Provider>
    )
}