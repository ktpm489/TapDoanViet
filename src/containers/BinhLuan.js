import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import CmtItem from "../components/status/CmtItem";


class BinhLuan extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataCmt: [
                {
                    fullName: 'Hiệu Nguyễn',
                    avt: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg',
                    cmt: 'thế giờ mày thích sao?'
                },
                {
                    fullName: 'Hiền Hyhy',
                    avt: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg',
                    cmt: 'một con vịt xòe ra 2 cái cánh, nó kêu rằng fuck you'
                },
                {
                    fullName: 'Nguyễn Công Phượng',
                    avt: 'http://s1.img.yan.vn/YanNews/2167221/201608/20160816-120254-13_600x600.jpg',
                    cmt: 'hôm nay mình đá hay quá'
                },
            ]
        }
    }
    render (){
        return (
            <View style = {{flex:1, backgroundColor:'white'}}>
                <FlatList
                    data={this.state.dataCmt}
                    renderItem={(item) => {
                        return (
                            <CmtItem
                                dataItem={item}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

            </View>
        );
    }
}
export default BinhLuan