import React, { Component, PropTypes } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Drawer from 'react-native-drawer'
import darkTheme from '../themes/dark.js'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FEFEFE',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FEFEFE',
    marginBottom: 5,
  },
});

var drawerStyles = {
  drawer: { 
    shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15,
  },
}

export default class Home extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  closeControlPanel = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  toCounter = () => {
    const { navigate } = this.props;
    navigate({
      type: 'push',
      key: 'counter'
    });
  }

  render() {
    return (
      <Drawer
        type="overlay"
        content={
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Fraser Space Systems
            </Text>
            <TouchableOpacity onPress={this.toCounter}>
              <Text style={styles.instructions}>click here lol</Text>
            </TouchableOpacity>
          </View>
        }
        tapToClose={true}
        openDrawerOffset={0.2}
        panOpenMask={0.1}
        panCloseMask={0.2}
        panThreshold={0.1}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        tweenEasing="easeInOutSine"
        // use tweenEasing="easeOutQuart" for dragging instead, smoother
        ref={(ref) => this._drawer = ref}
        elevation={4}
      >
        <Container style={styles.container} theme={darkTheme}> 
          <Header>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='md-menu' />
            </Button>

            <Title>News</Title>

          </Header>

          <Content>
            <Text style={styles.welcome}>
              Fraser Space Systems
            </Text>
            <TouchableOpacity onPress={this.toCounter}>
              <Text style={styles.instructions}>click here lol</Text>
            </TouchableOpacity>
          </Content>

        </Container>
      </Drawer>
      
    );
  }
}
