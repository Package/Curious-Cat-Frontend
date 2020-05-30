
export const getAcessToken = () => {
    return localStorage.getItem("authToken");
}

export const isLoggedIn = () => {
    return getAcessToken() != null;
}

export const buildHeader = () => {
    return {
        'Authorization': `Bearer ${getAcessToken()}`
    }
}

export const buildAuthorizationHeader = () => {
    if (!isLoggedIn())
        return {}

    return {
        headers: buildHeader()
    }
}