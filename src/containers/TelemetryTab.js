import React, { Component, PropTypes } from 'react';
import { 
  StyleSheet, 
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

const styles = StyleSheet.create({
  tab: {
    padding: 4,
    height: 600
  },
  panel: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 4,
    //minHeight: 150,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

@connect(
  state => ({
    newsFeed: state.newsFeed
  }),
  dispatch => bindActionCreators(CounterActions, dispatch)
)
export default class TelemetryTab extends Component {
  constructor(props) {
    super(props);

    let ws = new WebSocket('ws://echo.websocket.org');
    ws.onopen = () => {
      ws.send('ws onopen');
    };

    ws.onmessage = (e) => {
      console.log(e.data);
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };

    this.state = {
      ws,
      telemetry: undefined,
      refreshing: false,
      counter: 0,
    };
    this.loadTelemetry = this.loadTelemetry.bind(this);
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
    });
    this.loadTelemetry();
  }

  loadTelemetry() {
    return fetch('https://stevenhuang.ca')
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          telemetry: responseJson,
          refreshing: false,
        });
        this.state.ws.send("hey");
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView
        style={{marginTop:-1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['#303F9F']}
          />
        }
      >
        <View style={styles.tab}>
          <View style={{flex:3, flexDirection:'row'}}>
            <View style={[{flex: 1}, styles.panel]}>
              <Text>Live data</Text>
            </View>
            <View style={[{flex: 2}, styles.panel]}>
              <Text>Live data</Text>
            </View>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <View style={[{flex: 1}, styles.panel]}>
              <Text>Live data</Text>
            </View>
            <View style={[{flex: 1}, styles.panel]}>
              <Text>Live data</Text>
            </View>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <View style={[{flex: 1}, styles.panel]}>
              <Text>Live data</Text>
            </View>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <View style={[{flex: 1}, styles.panel]}>
              <Text>Live data</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
