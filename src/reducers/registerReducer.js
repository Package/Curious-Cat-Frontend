

const registerReducer = (state, action) => {
    switch (action.type) {
        case "updateField":
            return { ...state, [action.field]: action.value }
        case "register":
            return { ...state, success: action.message, error: '' }
        case "error":
            return { ...state, error: action.message, success: '' }
    }

    return state
}

export default registerReducer