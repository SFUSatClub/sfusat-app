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

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    backgroundColor: '#1f1d1d',
    borderColor: 'rgb(41, 41, 41)',
    borderRadius: 2,
    // should be the same as parent container's padding (TelemetryTab's inner View)
    margin: 4,
    padding: 6,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  header: {
    fontSize: 11,
    color: '#D8D9DA',
    textAlign: 'center',
  },
});

export default class TelemetryPanel extends Component {
  static propTypes = {
    // how big this panel should flex to; same as style flex
    flex: React.PropTypes.number.isRequired,
    // panel name
    header: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View 
        style={[{flex:this.props.flex}, styles.panel, this.props.style]}
      >
        <Text style={styles.header}>{this.props.header}</Text>
        {this.props.children}
      </View>
    );
  }
}
