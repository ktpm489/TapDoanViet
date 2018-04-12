
import { NavigationActions } from 'react-navigation'

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
        alert("Tài khoản bị khóa hoặc token hết hạn");
}