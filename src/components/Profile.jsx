import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {Loading} from './Loading';
import {buildAuthorizationHeader, buildHeader} from '../auth';
import {useParams} from 'react-router-dom';
import {QuestionGrid} from './QuestionGrid';
import {AskQuestion} from "./AskQuestion";

export const Profile = () => {

    const {id} = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('questions');

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
     * Builds the follow/unfollow buttons.
     */
    const followButton = () => {
        if (data.info.own_profile)
            return false;

        if (isFollowing) {
            return <button className="btn btn-danger"
                           onClick={(e) => follow(data.info.user_id, 'unfollow')}>Unfollow</button>
        } else {
            return <button className="btn btn-success" onClick={(e) => follow(data.info.user_id, 'follow')}>Follow</button>
        }
    }


    /**
     * Makes the request to follow/unfollow a user.
     *
     * @param {*} user
     * @param {*} followType
     */
    const follow = (user, followType) => {
        Axios({
            method: followType === 'unfollow' ? 'delete' : 'post',
            url: `/api/following.php?id=${user}`,
            data: {},
            headers: buildHeader()
        }).then(res => {
                if (followType === 'unfollow') {
                    setFollowers(followers - 1);
                    setIsFollowing(false);
                } else {
                    setFollowers(followers + 1);
                    setIsFollowing(true);
                }
            }
        ).catch(err => console.error(err));
    }

    /**
     * Reloads the profile to bring in the new data after asking a question.
     */
    const onQuestionAsked = () => {
        setCurrentTab('answers')
        setLoading(true)
    }

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div>
            <h1 className="display-4">{data.info.username}</h1>

            <p>
                {!data.info.own_profile && followButton()}
            </p>

            <ul>
                <li><strong>Joined:</strong> {data.info.created_at}</li>
                <li><strong>Followers:</strong> {followers}</li>
                <li><strong>Following:</strong> {following}</li>
            </ul>

            {!data.info.own_profile && <AskQuestion onQuestionAsked={onQuestionAsked} userId={id}/>}

            <ul className="nav nav-pills nav-fill mb-2">
                <li className="nav-item">
                    <a className={`nav-link ${currentTab === 'questions' ? 'active' : ''}`}
                       onClick={(e) => setCurrentTab('questions')}>Questions ({data.questions.length})</a>
                </li>
                <li className={`nav-item ${currentTab === 'answers' ? 'active' : ''}`}>
                    <a className={`nav-link ${currentTab === 'answers' ? 'active' : ''}`}
                       onClick={(e) => setCurrentTab('answers')}>Answers ({data.answers.length})</a>
                </li>
            </ul>

            <QuestionGrid questions={currentTab === 'questions' ? data.questions : data.answers}/>
        </div>
    )
}
