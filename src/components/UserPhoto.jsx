import React from 'react';

export const UserPhoto = ({photoPath}) => {

    /**
     * User does not have a photo uploaded, or they are anonymous.
     * In this situation use the default photo.
     */
    if (photoPath === undefined || photoPath === null) {
        photoPath = `${process.env.PUBLIC_URL}/defaults/default_picture_grey.jpg`;
    }

    return (
        <img className="photo photo--small" src={photoPath} alt="Profile Pic"/>
    );
};
