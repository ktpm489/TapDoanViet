var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    // title: 'Chọn ảnh',
    quality: 0.5,
    maxWidth: 768,
    maxHeight: 768,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

let PickerImage = (cb) => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            cb(source, response.data);
        }
    });
}

module.exports = PickerImage;