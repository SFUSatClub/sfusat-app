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
        style={{marginTop: -1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['#303F9F']}
          />
        }
      >
        <View style={this.props.tabStyle.card}>
          <Text>Live data</Text>
        </View>
        <View style={this.props.tabStyle.card}>
          <Text>Live data</Text>
        </View>
      </ScrollView>
    );
  }
}
