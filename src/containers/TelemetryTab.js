import React, { Component, PropTypes } from 'react';
import { 
  StyleSheet, 
  ListView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Picker
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import darkTheme from '../themes/dark';
import TelemetryPanel from '../components/TelemetryPanel';
import * as CounterActions from '../actions/counter';

const styles = StyleSheet.create({
  tab: {
    padding: 5,
    height: 620,
    backgroundColor: darkTheme.backgroundColor,
  },
  txt: {
    fontSize: 9,
    color: darkTheme.txtColor,
  },
  txtGood: {
    fontSize: 9,
    color: 'green',
  },
  txtWarning: {
    fontSize: 9,
    color: 'yellow',
  },
  txtBad: {
    fontSize: 9,
    color: 'red',
  },
  txtSmall: {
    fontSize: 7,
    textAlign: 'center',
    marginBottom: 5,
    color: '#D8D9DA',
    padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
    backgroundColor: "#292929",
  },
  txtLegend: {
    fontSize: 7,
    color: '#D8D9DA',
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


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      ws: undefined,
      telemetry: undefined,
      refreshing: false,
      dataSource: ds.cloneWithRows(['metrics 1', 'metrics 2']),
      timeSeriesType: 'temp',
      counter: 0,
    };

    this.setupWebsocket = this.setupWebsocket.bind(this);
    this.loadTelemetry = this.loadTelemetry.bind(this);
  }

  componentWillMount() {
    this.setupWebsocket();
  }

  setupWebsocket() {
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

    this.setState({
      ws
    });
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
        
        // 0: connection has not yet been established.
        // 1: connection is established and communication is possible.
        // 2: connection is going through the closing handshake.
        // 3: connection has been closed or could not be opened.
        console.log(`ws.readyState: ${this.state.ws.readyState}`);
        if(this.state.ws.readyState === 1) {
          this.state.ws.send("hey");
        }

        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
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
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Status</Text>
                <Text style={styles.txtGood}>OK</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Battery</Text>
                <Text style={styles.txtGood}>OK</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Radio</Text>
                <Text style={styles.txtGood}>OK</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>EPS</Text>
                <Text style={styles.txtGood}>OK</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Other</Text>
                <Text style={styles.txtBad}>CRITICAL</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Other2</Text>
                <Text style={styles.txtWarning}>WARNING</Text>
              </View>
            </TelemetryPanel>
            <TelemetryPanel 
              flex={1}
              header={'Payload Telemetry'}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Voltage</Text>
                <Text style={styles.txtGood}>4.25</Text>
                <Text style={styles.txt}>Vdc</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Downlink</Text>
                <Text style={styles.txtGood}>437.840</Text>
                <Text style={styles.txt}>MHz</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.txt}>Uplink</Text>
                <Text style={styles.txtGood}>145.890</Text>
                <Text style={styles.txt}>MHz</Text>
              </View>
              <View style={{marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                <Text style={[styles.txt, {fontSize:14}]}>LOS in</Text>
                <Text style={[styles.txtGood, {fontSize:14}]}>00h:12m:25s</Text>
              </View>
            </TelemetryPanel>
          </View>
          <View style={{flex:3, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={2}
              header={'Time Series'}>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => this.setState({timeSeriesType:'temp'})}>
                    <Text style={styles.txtSmall}>Temp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({timeSeriesType:'power'})}>
                    <Text style={styles.txtSmall}>Power</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({timeSeriesType:'radio'})}>
                    <Text style={styles.txtSmall}>RX/TX</Text>
                  </TouchableOpacity>
                </View>
                <TelemetryPanel flex={4} style={{marginTop:0, marginBottom:0}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center'}}>
                      <Text style={[styles.txtLegend, {fontSize:15}]}>{this.state.timeSeriesType} graphs here</Text>
                    </View>
                  </View>
                </TelemetryPanel>
                <View style={{flex:1}}>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={styles.txtLegend}>{rowData}</Text>}
                  />
                </View>
              </View>
            </TelemetryPanel>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={1} 
              header={'Command Log'}>
              <ScrollView>
                <View>
                  <Text style={[styles.txt, {fontSize: 7, fontFamily:'monospace'}]}>
                    {"> 1 test\n> 2 test33\n> 3\n> 4\n> 5\n> 6\n> 7\n> 8"}
                  </Text>
                </View>
              </ScrollView>
            </TelemetryPanel>
            <TelemetryPanel
              flex={1}
              header={'Satellite GPS'}>
              <TelemetryPanel flex={1}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center'}}>
                      <Text style={[styles.txtLegend, {fontSize:15, textAlign:'center'}]}>render of sat loc here</Text>
                    </View>
                  </View>
              </TelemetryPanel>
            </TelemetryPanel>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
            <TelemetryPanel 
              flex={1} 
              header={'Mission Information'}>

              {/* TODO: picker/.item to be styled appropriately in native android/ios */}
              <Picker
                style={{color:'#D8D9DA'}}
                mode='dropdown'
                selectedValue={this.state.language}
                onValueChange={(lang) => this.setState({language: lang})}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
              </Picker>
            </TelemetryPanel>
          </View>
        </View>
      </ScrollView>
    );
  }
}
