import React from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";

export const FollowButton = ({userId, isFollowing, ownProfile, onFollow}) => {

    /**
     * Makes the request to follow/unfollow a user.
     */
    const follow = (followType) => {
        Axios({
            method: followType === 'unfollow' ? 'delete' : 'post',
            url: `/api/following.php?id=${userId}`,
            data: {},
            headers: buildHeader()
        }).then(_ => onFollow(followType)).catch(err => console.error(err));
    }

    if (ownProfile) {
        return false;
    }

    if (isFollowing) {
        return <p><button className="btn btn-outline-danger" onClick={(e) => follow('unfollow')}>Unfollow</button></p>
    } else {
        return <p><button className="btn btn-outline-success" onClick={(e) => follow('follow')}>Follow</button></p>
    }
};

