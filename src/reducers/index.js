import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers'
import DichVuReducers from './DichVuReducers'

import TaoBaiVietReducers from './TaoBaiVietReducers'

import SocketReducer from './SocketReducer'
import MessageReducers from './MessageReducers'
import ProfileReducers from './ProfileReducers'
import GetPostReducers from './GetPostReducers'
import CreateCmtReducers from './CreateCmtReducers'
import DangKyReducers from "./DangKyReducers";
import UpdateInfoReducers from "./UpdateInfoReducers";
 import GetAdminReducers from "./GetAdminReducers";



const appStore = combineReducers({
    LoginReducers,
    DichVuReducers,

    TaoBaiVietReducers,
    SocketReducer,
    SocketRef:SocketReducer,
    MessageReducers,
    ProfileReducers,
    GetPostReducers,
    CreateCmtReducers,
    DangKyReducers,
    UpdateInfoReducers,
    GetAdminReducers
    
});

const initialState = appStore({}, {})
export const LogoutReducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = initialState
      }
      console.log("initialState",initialState);
      return appStore(state, action)
}

export default appStore


