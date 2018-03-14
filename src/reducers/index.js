import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers'
import DichVuReducers from './DichVuReducers'

import TaoBaiVietReducers from './TaoBaiVietReducers'

import SocketReducer from './SocketReducer'
import MessageReducers from './MessageReducers'
import ProfileReducers from './ProfileReducers'
import GetPostReducers from './GetPostReducers'
import CreateCmtReducers from './CreateCmtReducers'

const appStore = combineReducers({
    LoginReducers,
    DichVuReducers,

    TaoBaiVietReducers,
    SocketReducer,
    SocketRef:SocketReducer,
    MessageReducers,
    ProfileReducers,
    GetPostReducers,
    CreateCmtReducers

});
export default appStore