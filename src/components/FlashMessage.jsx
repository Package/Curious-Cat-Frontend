import React from 'react';

export const FlashMessage = ({type, message}) => {
    if (message === '' || type === '') {
        return false;
    }

    if (type === 'success') {
        return <div className="alert alert-success">
            {message}
        </div>
    } else if (type === 'error') {
        return <div className="alert alert-danger">
            {message}
        </div>
    }
};
