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

import { 
  Container, 
  Content, 
  CardItem, 
  Thumbnail, 
  Icon,
  Button,
} from 'native-base';

import Video from 'react-native-video';
import Immutable from 'immutable';

import darkTheme from '../themes/dark';
import Utils from '../utils';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginTop: 30,
  },
});

export default class NewsItem extends Component {
  static shared = {
    error_date: new Date()
  };
  static propTypes = {
  };

  constructor(props) {
    super(props);

    let formattedDate = "";
    let numLikes = 0;
    let numComments = 0;
    if(props.instagramModel) {
      let utcMS = parseInt(props.instagramModel.created_time) * 1000;
      formattedDate = Utils.formattedDateFromUTC(utcMS);
      numLikes = props.instagramModel.likes.count;
      numComments = props.instagramModel.comments.count;
    } else {
      formattedDate = Utils.formattedDateFromUTC(NewsItem.shared.error_date);
    }

    this.state = {
      imageLoaded: false,
      numLikes,
      numComments,
      formattedDate,
    }
    // TODO: check if props.instagramModel exists
    Image.getSize(this.getLargestInstagramImgUrl(props.instagramModel), (width, height) => {
      // TODO: scale to width of container
      let scaledWidth = 360;
      const scaleFactor = width / scaledWidth;
      let scaledHeight = height / scaleFactor;
      //console.log(`dl_W: ${width} dl_H: ${height} sf: ${scaleFactor} sh: ${scaledHeight}`);
      this.setState({
        imageLoaded: true,
        imageWidth: width,
        imageHeight: height,
        imageWidthScaled: scaledWidth,
        imageHeightScaled: scaledHeight,
      });
    });
  }

  getLargestInstagramImgUrl(instagramModel) {
      return 'https://www.instagram.com/p/' + instagramModel.code + '/media/?size=l'
  }

  render() {
    const { imageLoaded } = this.state;
    let imageLoadedStyle = {};
    if(imageLoaded) {
      imageLoadedStyle = {width: this.state.imageWidthScaled, height: this.state.imageHeightScaled};
    }

    const { counter, toCounter, instagramModel } = this.props;

    // get the large version of each image so it crops and looks nicer
    let largeDest = undefined;
    let instagramMedia = undefined;
    if(instagramModel) {
      largeDest = this.getLargestInstagramImgUrl(instagramModel);
      // if is video
      if(instagramModel.alt_media_url) {
        instagramMedia = (
            <Video
              style={imageLoadedStyle}
              resizeMode='cover'
              repeat={true}
              muted={true}
              source={{uri:instagramModel.alt_media_url}} />
        )
      } else {
        instagramMedia = (
            <Image
              style={imageLoadedStyle}
              resizeMode='cover'
              source={{uri:largeDest}} />
        )
      }
      //console.log(`largeDest: ${largeDest}`);
    }

    return (
      <View 
        style={[styles.card, this.props.style]}
        onLayout={(event) => {
          const {x, y, width, height} = event.nativeEvent.layout;
          this.setState({cardWidth: width});
        }}
      >

        {/* Header */}
        {instagramModel ? 
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingLeft:10, paddingRight:10}}>
            <View style={{flexDirection:'row'}}>
              <Thumbnail
                style={{marginRight:10}}
                size={40}
                resizeMode='cover'
                source={{uri:instagramModel.user.profile_picture}} />
              <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', color:darkTheme.txtColor}}>{instagramModel.user.username}</Text>
                {instagramModel.location &&
                  <Text style={{color:darkTheme.txtColor}}>{instagramModel.location.name}</Text>
                }
              </View>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', color:darkTheme.txtColor}}>{"Instagram"}</Text>
            </View>
          </View>
            :
          <View style={{flexDirection:'row', }}>
            <Text style={{color:'black'}}>{this.props.provider}</Text>
          </View>
        }

        {/* Text */}
        <View style={{padding:20, paddingTop:10, paddingBottom:10}}>
          <Text style={{fontSize: 9, color:darkTheme.txtColor}}>
            {this.state.formattedDate}
          </Text>
          <Text style={{fontWeight:'normal', fontSize: 14, color:darkTheme.txtColor}}>
            {instagramModel ? instagramModel.caption.text : this.props.content}
          </Text>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
            <Icon name='md-heart' style={{fontSize:14, color : darkTheme.customIndigo, marginRight:3}} />
            <Text style={{fontSize: 9, color:darkTheme.txtColor, marginRight:15}}>{this.state.numLikes} Likes</Text>
            <Icon name='md-chatboxes' style={{fontSize:14, color : darkTheme.customIndigo, marginRight:4}} />
            <Text style={{fontSize: 9, color:darkTheme.txtColor, marginRight:15}}>{this.state.numComments} Comments</Text>
          </View>
        </View>

        {/* Img */}
        <View>
          {instagramModel ?
            instagramMedia
                :
            <Image 
              style={{width: this.state.cardWidth, height: this.state.cardWidth}}
              resizeMode='cover'
              onLoad={() => this.setState({imageLoaded: true}) }
              source={{uri:'https://liquiddandruff.github.io/reveal.js/cubesat.jpg'}} />
          }
        </View>

      </View>
    );
  }
}
