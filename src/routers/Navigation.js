import React from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator }from 'react-navigation'
import Login from "../containers/Login";
import DichVu from "../containers/DichVu";
import TrangChu from "../containers/TrangChu";
import TinNhan from "../containers/TinNhan";
import ThongBao from "../containers/ThongBao";
import Chat from "../containers/Chat"
import TaoBaiViet from "../containers/TaoBaiViet";
import Launcher from "../containers/Launcher";
import Dimensions from 'Dimensions';
import MenuLeft from "../containers/MenuLeft";
import ThongTinCaNhan from "../containers/ThongTinCaNhan";
import TienIch from "../containers/TienIch";
import BaoCaoKhanCap from "../containers/BaoCaoKhanCap";
import GopYPhanHoi from "../containers/GopYPhanHoi";
import DichVuDetail from "../containers/DichVuDetail";
import LoadData from "../containers/LoadData";
import BinhLuan from "../containers/BinhLuan";
import PhiDichVu from "../containers/PhiDichVu"
import TienIchDetail from "../containers/TienIchDetail"
import SearchUser from "../containers/SearchUser"
import ServiceHistory from "../containers/ServiceHistory"
const DEVICE_WIDTH = Dimensions.get('window').width;
var widthMenu = 0;

if (DEVICE_WIDTH >= 500) {
    widthMenu = DEVICE_WIDTH*1/2;
} else {
    widthMenu = DEVICE_WIDTH*3/4;
}

const Tab = TabNavigator ({
    DichVu: {
        screen: DichVu,
        navigationOptions:{
            title: 'Dịch vụ'
        }
    },
    TrangChu: {
        screen: TrangChu,
        navigationOptions:{
            title: 'Trang chủ'
        }
    },
    Message: {
        screen: TinNhan,
        navigationOptions:{
            title: 'Tin nhắn'
        }
    },

    ThongBao: {
        screen: ThongBao,
        navigationOptions:{
            title: 'Thông báo'
        }
    }
},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,
         //    showIcon: true,
            activeTintColor: 'black',
            inactiveTintColor: 'white',
            activeBackgroundColor:'white',
            inactiveBackgroundColor:'#eaa33f',
            // pressColor: 'white',
            indicatorStyle: {
                // backgroundColor: 'white'
                backgroundColor: 'transparent'
            },
            labelStyle: {
                fontSize: 12,

            },
            style: {
                backgroundColor: '#eaa33f',
            },
            // tabStyle: {
            //     backgroundColor:'white'
            // }
        }
    }
);

const StackMenu = StackNavigator({
    Tab: {
        screen: Tab,
    },
    MenuLeft: {
        screen: MenuLeft,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },

})
const Menu = DrawerNavigator({

        Tab1: {
            screen: StackMenu
        }
    },
    {
        drawerWidth: 300,
        drawerPosition: "left",
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: props => <MenuLeft {...props}/>,
    }
);
const Stack = StackNavigator ({
    Launcher: {
        screen: Launcher  ,
        navigationOptions: {
            header : null
        }
    },


    Login: {
        screen: Login,
        navigationOptions: {
            header : null
        }
    },
   
    Tab: {
        screen: Menu,
        navigationOptions: {
            header: null
        }
    },

    
    

    Chat:{
        screen:Chat,
        navigationOptions:{
            title: 'Chat'
        }
    },
    LoadData: {
        screen: LoadData,
        navigationOptions: {
            header: null
        }
    },

    TaoBaiViet: {
        screen: TaoBaiViet,
        navigationOptions: {
            title: 'Tạo bài viết'
        }
    },
    ThongTinCaNhan: {
        screen: ThongTinCaNhan,
        navigationOptions: {
            title: 'Thông tin cá nhân'
        }
    },
    TienIch: {
        screen: TienIch,
        navigationOptions: {
            title: 'Tiện ích'
        }
    },
    // TienIchDetail:{
    //     screen: TienIchDetail,
    //     navigationOptions: {
    //         title: 'Chi tiết'
    //     }
    // },
    BaoCaoKhanCap: {
        screen: BaoCaoKhanCap,
        navigationOptions: {
            title: 'Báo cáo khẩn cấp'
        }
    },
    GopYPhanHoi: {
        screen: GopYPhanHoi,
        navigationOptions: {
            title: 'Góp ý phản hồi'
        }
    },
    DichVuDetail:{
        screen:DichVuDetail
    },
    BinhLuan: {
        screen: BinhLuan,
        navigationOptions: {
            header: null
        }
    },
    PhiDichVu:{
        screen:PhiDichVu
    },
    SearchUser:{
        screen:SearchUser,
        navigationOptions: {
            title: 'Tìm kiếm'
        }
        
    },
    ServiceHistory:{
        screen:ServiceHistory,
        navigationOptions: {
            title: 'Lịch sử dịch vụ'
        }
    }


})
const RootStack = StackNavigator({
    Stack: {
        screen: Stack,
        navigationOptions: {
            header: null
        }
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            header: null
        }
    }
})

export default RootStack;
