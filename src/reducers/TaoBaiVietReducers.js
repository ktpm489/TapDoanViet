const TaoBaiVietReducers = (state = [], action) => {
    switch (action.type) {
        case 'TAO_BAI_VIET':
            return {
                payload : action.payload,
                payload1: action.payload1
         }
        default:
            return state
    }
}

export default TaoBaiVietReducers