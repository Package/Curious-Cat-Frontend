import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Loading } from './Loading';
import { buildAuthorizationHeader, buildHeader } from '../auth';
import { useParams } from 'react-router-dom';
import { QuestionGrid } from './QuestionGrid';

export const Profile = () => {

    const [data, setData] = useState({})
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('questions');

    useEffect(() => {
        Axios.get(profileEndPoint(), buildAuthorizationHeader()).then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    }, [id])

    /**
     * Builds the endpoint to retrieve information on the profile.
     * If an ID is specifically provided then load the profile for that ID,
     * otherwise, load the profile for the current user.
     */
    const profileEndPoint = () => {
        let profileEndPoint = '/api/profile.php';
        if (id != undefined) {
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

        if (data.info.is_following) {
            return (
                <button className="btn btn-dark" onClick={(e) => follow(data.info.user_id, 'unfollow')}>Unfollow</button>
            )
        } else {
            return (
                <button className="btn btn-dark" onClick={(e) => follow(data.info.user_id, 'follow')}>Follow</button>
            )
        }
    }


    /**
     * Makes the request to follow/unfollow a user.
     * 
     * @param {*} user 
     * @param {*} followType 
     */
    const follow = (user, followType) => {
        console.log(`Going to ${followType} user ${user}`);

        Axios({
            method: followType == 'unfollow' ? 'delete' : 'post',
            url: `/api/following.php?id=${user}`,
            data: {},
            headers: buildHeader()
        }).then(res => {
            if (followType == 'unfollow') {
                data.info.follower_count -= 1;
            } else {
                data.info.following_count += 1;
            }
        }
        ).catch(err => console.error(err));

    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            <h2>{data.info.username}</h2>

            <p>
                {!data.info.own_profile && followButton()}
            </p>

            <dl>
                <dt>Joined</dt>
                <dd>{data.info.created_at}</dd>

                <dt>Followers</dt>
                <dd>{data.info.follower_count}</dd>

                <dt>Following</dt>
                <dd>{data.info.following_count}</dd>
            </dl>

            <ul className="nav nav-tabs nav-fill mb-2">
                <li className="nav-item">
                    <a className={`nav-link ${currentTab === 'questions' ? 'active' : ''}`} onClick={(e) => setCurrentTab('questions')}>Questions ({data.questions.length})</a>
                </li>
                <li className={`nav-item ${currentTab === 'answers' ? 'active' : ''}`}>
                    <a className={`nav-link ${currentTab === 'answers' ? 'active' : ''}`} onClick={(e) => setCurrentTab('answers')}>Answers ({data.answers.length})</a>
                </li>
            </ul>

            <QuestionGrid questions={currentTab === 'questions' ? data.questions : data.answers} />

        </div>
    )
}
