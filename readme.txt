react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/


add vietnamemase image picker:
const DEFAULT_OPTIONS = {
  title: 'Chọn ảnh',
  cancelButtonTitle: 'Trở lại',
  takePhotoButtonTitle: 'Chụp ảnh…',
  chooseFromLibraryButtonTitle: 'Chọn ảnh từ thư viện…',
  quality: 1.0,
  allowsEditing: false,
  permissionDenied: {
    title: 'Quyền bị từ chối',
    text: 'Để có thể chụp ảnh bằng máy ảnh của bạn và chọn hình ảnh từ thư viện của bạn.',
    reTryTitle: 'Thử lại',
    okTitle: 'Tôi chắc chắn',
  }
};