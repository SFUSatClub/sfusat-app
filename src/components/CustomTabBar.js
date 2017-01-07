import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import darkTheme from '../themes/dark';

const CustomTabBar = React.createClass({
  tabIcons: [],
  // dark.js customIdigo in RGB
  iconR: 48,
  iconG: 63,
  iconB: 159,

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = this.iconR + (204 - this.iconR) * progress;
    const green = this.iconG + (204 - this.iconG) * progress;
    const blue = this.iconB + (204 - this.iconB) * progress;
    //console.log( `rgb(${red}, ${green}, ${blue})`);
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: `rgb(${this.iconR},${this.iconG},${this.iconB})`,
      //backgroundColor: darkTheme.customIndigo,
      bottom: 0,
    };

    const offset = containerWidth * 0.1;
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
      <View style={{position:'absolute', width:containerWidth, height:1, backgroundColor: 'rgba(0,0,0,0.05)', bottom:0}} />
      <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  tabs: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#292929',
  },
});

export default CustomTabBar;
