import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet, AsyncStorage,
    Alert

} from 'react-native'
import Dimensions from 'Dimensions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { BASE_URL, CREATE_GROUP, LIKE } from "../../Constants";
import logout from '../TokenExpired'
import { connect } from "react-redux";
class StatusItems extends Component {

    constructor(props) {
        super(props)

        this.arrUserLike = this.props.dataItem.item.likes;
        this.state = {
            reload: 0,
            liked: false,
            countLike: this.arrUserLike.length

        }

    }



    likePost = (postId) => {

        console.log("postId", postId);
        AsyncStorage.getItem("token").then(value => {

            fetch(BASE_URL + LIKE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": value
                },
                body: JSON.stringify({
                    postId: postId,
                    action: 1


                })
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log("data like", data);
                if (data && data.errorCode === "401") {
                    logout(AsyncStorage, this.props)
                    return;
                } else if (data && data.errorCode === 0) {
                    let currentLike = this.state.countLike;
                    currentLike++;

                    this.setState({ liked: true, countLike: currentLike });
                } else {
                    Alert.alert("Thông báo", "có lỗi sảy ra");
                }
            }).catch(e => {
                console.log("exception", e);
                Alert.alert("Thông báo", "Có lỗi khi like");
            });
        });




    }
    unlikePost = (postId) => {
        console.log("call unlike")
        AsyncStorage.getItem("token").then(value => {

            fetch(BASE_URL + LIKE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": value
                },
                body: JSON.stringify({
                    postId: postId,
                    action: 0


                })
            }).then(response => {
                return response.json()
            }).then(data => {
                console.log("data unlike", data)
                if (data && data.errorCode === "401") {
                    logout(AsyncStorage, this.props)
                    return;
                } else if (data && data.errorCode === 0) {
                    let currentLike = this.state.countLike;
                    if (currentLike > 0) {
                        currentLike--;
                    }
                    this.setState({ liked: false, countLike: currentLike });
                } else {
                    Alert.alert("Thông báo", "có lỗi sảy ra");
                }
            }).catch(e => {
                console.log("exception", e);
                Alert.alert("Thông báo", "Có lỗi khi unlike");
            });
        });

    }

    onbackReload = (dataNewComment) => {
        // console.log("dataNewComment",dataNewComment);
        this.props.dataItem.item.comments = dataNewComment;
        this.setState({ reload: this.state.reload++ });
        // console.log("state-cmt",this.state.reload);
    }

    componentWillMount() {
        // this.setState({countLike:this.arrUserLike})
        if (this.arrUserLike && this.arrUserLike.length > 0 && this.props.InfoUser && this.props.InfoUser.userInfo && this.props.InfoUser.userInfo.id) {
            // console.log("arr user like",this.arrUserLike)
            // console.log("user",this.props.InfoUser.userInfo)
            if (this.arrUserLike.indexOf(this.props.InfoUser.userInfo.id) > -1) {
                console.log("post da like", this.props.dataItem.item)
                this.setState({ liked: true })
            }



        }
    }

    render() {
        const { item } = this.props.dataItem;

        const { navigation, InfoUser } = this.props;
        if (InfoUser.length <= 0) {
            return null
        }
        return (
            <View>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {/*<Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}*/}
                        {/*style = {styles.image_circle}*/}
                        {/*resizeMode="cover"*/}
                        {/*>*/}
                        {/*</Image>*/}

                        <Image style={styles.image_circle}
                            source={
                                !item.createdBy.avatar ? require("../../images/noavatar.png") : {
                                    uri: item.createdBy.avatarUrl
                                }}
                            resizeMode="cover"
                        >
                        </Image>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.createdBy ? item.createdBy.lastName : null} {item.createdBy ? item.createdBy.firstName : null}</Text>
                            {/*<Text>{moment(item.createdAt).startOf("hour").fromNow()}</Text>*/}
                            <Text>{moment(item.createdAt).format("DD-MM-YYYY HH:mm")}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ color: '#212121' }}>{item.content}</Text>
                    </View>
                    {
                        item.images ?
                            <TouchableOpacity
                            style={styles.imagePost}
                                onPress={() => this.props.navigation.navigate("ShowImage", { url: item.imageUrl.split(",")[0] })}
                            >
                                <Image source={{
                                    uri: item.imageUrl.split(",")[0]
                                }}
                                    style={{flex:1}}
                                    resizeMode="cover">
                                </Image>
                            </TouchableOpacity>
                            : null
                    }
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* <Icon1 name="like" size={25} color="#424242" /> */}
                            <Text style={{ color: '#424242' }} >{this.state.countLike > 0 ? this.state.countLike : null} Thích</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                            <Text> {item.comments.length} bình luận</Text>
                        </View>

                    </View>
                    <View style={{ height: 1, backgroundColor: '#cccccc', marginTop: 5 }} />
                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <Icon1 name="like" size={25} color={this.state.liked ? "blue" : "#424242"} />
                            <TouchableOpacity
                                onPress={() => this.state.liked ? this.unlikePost(item.id) : this.likePost(item.id)}
                            >
                                <Text style={{ color: this.state.liked ? 'blue' : null }}>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 20 }}>
                            <Icon1 name="comment" size={25} color="#424242" />

                            <Text style={{ color: '#424242' }}>Bình luận</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems: 'center' }}>
                        <Image style={styles.image_circle}
                            source={
                                !InfoUser.userInfo.avatar ? require("../../images/noavatar.png") : {
                                    uri: InfoUser.userInfo.avatarUrl
                                }}
                            resizeMode="cover"
                        >
                        </Image>
                        <TouchableOpacity onPress={() => navigation.navigate('BinhLuan', { itemCmt: item.comments, idRoom: item.id, onReloadBack: this.props.onReloadBack })}

                            style={{
                                marginLeft: 10, flex: 1,
                                backgroundColor: '#F5F5F5', borderRadius: 50,
                                borderWidth: 1,
                                borderColor: '#757575',
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <View>
                                <Text>Viết bình luận ...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 5, backgroundColor: '#cccccc', marginTop: 10 }} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        LogoutReducers: state.LogoutReducers,
        InfoUser: state.ProfileReducers
    }
};
StatusItems = connect(mapStateToProps)(StatusItems);
export default StatusItems
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
    imagePost: {
        width: DEVICE_WIDTH,
        height: 250,
        marginTop: 10
    }
})