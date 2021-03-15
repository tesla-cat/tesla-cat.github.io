
import {Dimensions} from 'react-native'

export {winHeight, winWidth, isWeb, newWidth, vidHeight}

const winHeight = Dimensions.get('window').height
const winWidth  = Dimensions.get('window').width
const isWeb = winHeight < winWidth

var newWidth = winWidth

if(newWidth > winHeight) newWidth = winHeight / 812 * 375

const vidHeight = newWidth / 1280 * 720
