import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {Loading} from './Loading';
import {buildAuthorizationHeader} from '../auth';
import {useParams} from 'react-router-dom';
import {QuestionGrid} from './QuestionGrid';
import {AskQuestion} from "./AskQuestion";
import {FollowButton} from "./FollowButton";

export const Profile = () => {

    const {id} = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);

    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (loading) {
            Axios.get(profileEndPoint(), buildAuthorizationHeader()).then(res => {
                console.log(res.data);
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

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div>
            <h1 className="display-4">{data.info.username}</h1>

            <FollowButton userId={id} isFollowing={isFollowing}
                          ownProfile={data.info.own_profile} onFollow={onFollow}/>

            <ul>
                <li><strong>Joined:</strong> {data.info.created_at}</li>
                <li><strong>Followers:</strong> {followers}</li>
                <li><strong>Following:</strong> {following}</li>
            </ul>

            {!data.info.own_profile && <AskQuestion userId={id}/>}

            <QuestionGrid questions={data.answers}/>
        </div>
    )
}
