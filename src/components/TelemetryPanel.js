import React, { 
  Component, 
  PropTypes,
} from 'react';

import { 
  StyleSheet,
  View, 
  Image,
  Text, 
  TouchableOpacity, 
} from 'react-native';

import darkTheme from '../themes/dark';

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: 'rgb(41, 41, 41)',
    borderRadius: 5,
    // should be the same as parent container's padding (TelemetryTab's inner View)
    margin: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  headerPanel: {
    position: 'absolute',
    top: -3,
    left: 12,
  },
  header: {
    fontSize: 11,
    backgroundColor: darkTheme.backgroundColor,
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: 'bold',
    color: '#D8D9DA',
    textAlign: 'center',
  },
});

export default class TelemetryPanel extends Component {
  static propTypes = {
    // how big this panel should flex to; same as style flex
    flex: React.PropTypes.number.isRequired,
    // panel name
    header: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let emptyHeaderPanel = this.props.header === undefined ? {paddingLeft:0, paddingRight:0} : {};
    return (
      <View 
        style={[{flex:this.props.flex}, this.props.style]}
      >
        <View 
          style={[{flex:this.props.flex}, styles.panel]}
        >
          {this.props.children}
        </View>
        <View style={styles.headerPanel}>
          <Text style={[styles.header, emptyHeaderPanel]}>{this.props.header}</Text>
        </View>
      </View>
    );
  }
}
