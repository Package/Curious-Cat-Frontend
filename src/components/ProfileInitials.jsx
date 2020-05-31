import React from 'react';

export const ProfileInitials = ({username}) => {
    return (
        <span className="initials">
            {`${username[0]}${username[1]}`.toUpperCase()}
        </span>
    );
};
