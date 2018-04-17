var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet, Dimensions
} = ReactNative;
const DEVICE_WIDTH = Dimensions.get('window').width;

var Style = StyleSheet.create({
  radioForm: {
  },

  // radioWrap: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   marginBottom: 5,
  // },
  radioWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // borderColor:'#BDBDBD',
    width: DEVICE_WIDTH - 25,
    height: 50,
  },
  radio: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',

    width: 30,
    height: 30,


    alignSelf: 'center',

    borderColor: '#2196f3',
    borderRadius: 30,
  },

  radioLabel: {
    paddingLeft: 10,
    lineHeight: 20,
    fontSize: 16,
  },

  radioNormal: {
    borderRadius: 10,
  },

  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: '#2196f3',
  },

  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 0,
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

module.exports = Style;
