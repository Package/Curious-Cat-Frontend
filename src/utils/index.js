
/**
 * Formats the username. Returns "Anonymous" if the username is null.
 * @param username
 * @returns {*}
 */
export const formatUsername = (username) => {
    return username == null ? 'Anonymous' : username;
}

/**
 * Returns whether the provided object is just an empty object, e.g. {}
 * @param object
 * @returns {boolean}
 */
export const objectIsEmpty = (object) => {
    return Object.keys(object).length === 0;
}