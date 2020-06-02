
export const getAccessToken = () => {
    return localStorage.getItem("authToken");
}

export const isLoggedIn = () => {
    return getAccessToken() != null;
}

export const buildHeader = () => {
    if (!isLoggedIn())
        return {}

    return {
        'Authorization': `Bearer ${getAccessToken()}`
    }
}

export const buildAuthorizationHeader = () => {
    if (!isLoggedIn())
        return {}

    return {
        headers: buildHeader()
    }
}