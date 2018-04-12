
import rootReducer from '../reducers'
const initialState = rootReducer({}, {})
const LogoutReducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = initialState
      }
      return rootReducer(state, action)
}

export default LogoutReducers