const LoginReducers = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN':
            return [
                ...state,
                {
                    // token: action.token,
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state
    }
}

export default LoginReducers