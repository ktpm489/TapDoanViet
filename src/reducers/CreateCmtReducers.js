const CreateCmtReducers = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_CMT':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default CreateCmtReducers