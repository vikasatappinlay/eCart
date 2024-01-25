import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {Component} from 'react';

export default class Icons extends Component {
  render() {
    const {name, size, color, type, style, onPress} = this.props;
    switch (type) {
      case 'fontAwesome':
        return (
          <FontAwesome
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'Octicons':
        return (
          <Octicons
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'AntDesign':
        return (
          <AntDesign
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'fontAwesome5pro':
        return (
          <FontAwesome5Pro
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'materialIcon':
        return (
          <MaterialIcon
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'materialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'feather':
        return (
          <Feather
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'simpleline':
        return (
          <SimpleLine
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      case 'entypo':
        return (
          <Entypo
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
      default:
        return (
          <IonIcon
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress && onPress}
          />
        );
    }
  }
}
