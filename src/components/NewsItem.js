import React, { 
  Component, 
  PropTypes,
} from 'react';

import { 
  StyleSheet,
  View, 
  Image,
  TouchableOpacity, 
} from 'react-native';

import { 
  Container, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Icon,
  Button,
} from 'native-base';

import Immutable from 'immutable';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    minHeight: 150,
    margin: 20,
    marginBottom: 0,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardItem: {
    //borderBottomWidth: 0,
  },
});

export default class NewsItem extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    Image.getSize('https://liquiddandruff.github.io/reveal.js/cubesat.jpg', (width, height) => {
      console.log("cubesat h: " + height);
      this.state = {
        originHeight: height,
      }
    });
    this.state = {
      ...this.state,
      imageWidth: 0,
      imageHeight: 0,
    };

    console.log(this.state);
  }

  render() {
    const { counter, toCounter, response, tabStyle } = this.props;
    /*<Card style={tabStyle.card}>*/
    //style={{justifyContent:'center',alignItems:'center'}}
    return (
      <Card 
        style={{padding:-1}}
        onLayout={(event) => {
          const {x, y, width, height} = event.nativeEvent.layout;
          this.setState({imageWidth: width});
        }}
      >
        <CardItem style={styles.cardItem}>
          <Thumbnail source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          <Text>Cubesat</Text>
          <Text note>FSS Facebook</Text>
        </CardItem>

        <CardItem style={styles.cardItem}>
          <Image 
            resizeMode='cover' source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          {/*<Image 
            style={{width:this.state.imageWidth, height:this.state.imageHeight}} 
            resizeMode='contain' source={require('./cubesat.jpg')} /> */}
          {/*<Image resizeMode='contain' style={{marginLeft:-300}} source={require('./cubesat.jpg')} />*/}
        </CardItem>

        <CardItem style={[styles.cardItem, {flex: 1, alignItems:'center'}]}>
          <View>
            <Icon name='md-heart' style={{color : '#ED4A6A'}} />
          </View>
        </CardItem>

        <CardItem style={[styles.cardItem, {borderBottomWidth:0}]}>
          <Text>Cubesat from NASA!</Text>
        </CardItem>

      </Card>
    );
  }
}
