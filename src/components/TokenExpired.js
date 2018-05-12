
import { NavigationActions } from 'react-navigation'
import {Alert} from 'react-native'

export default logout = (AsyncStorage,props)=>{
        AsyncStorage.removeItem('token')
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Login',
                }),
            ]
        });
        props.navigation.dispatch(resetAction)
        Alert.alert("Thông báo","Tài khoản bị khóa hoặc token hết hạn");
}