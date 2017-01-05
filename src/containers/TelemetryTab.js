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

import TelemetryPanel from '../components/TelemetryPanel';
import * as CounterActions from '../actions/counter';

const styles = StyleSheet.create({
  tab: {
    padding: 4,
    height: 600,
    backgroundColor: '#141414',
  },
  header: {
    fontSize: 11,
    textAlign: 'center',
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
            <TelemetryPanel 
              flex={1} 
              header={'Satellite Telemetry'}>
            </TelemetryPanel>
            <TelemetryPanel 
              flex={2}
              header={'Graphs'}>
            </TelemetryPanel>
          </View>
          <View style={{flex:3, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={1}
              header={'Payload Telemetry'}>
            </TelemetryPanel>
            <TelemetryPanel
              flex={2}
              header={'Satellite GPS'}>
            </TelemetryPanel>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={1} 
              header={'Command Log'}>
            </TelemetryPanel>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={1} 
              header={'Mission Information'}>
            </TelemetryPanel>
          </View>
        </View>
      </ScrollView>
    );
  }
}
