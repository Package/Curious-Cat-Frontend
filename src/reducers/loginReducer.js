
const loginReducer = (state, action) => {
    switch (action.type) {
        case "updateField":
            return {...state, [action.field]: action.value}
        case 'login':
            return {...state, success: action.message}
        case "error":
            return {...state, error: action.message}
        default:
            return state
    }
}

export default loginReducer