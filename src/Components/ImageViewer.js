import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Title, Text, Button} from 'native-base';
import ImageView from 'react-native-image-view';

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      isVisible: props.isVisible,
    }
  }

  componentWillReceiveProps(nextProp){
    this.setState({
      isVisible: nextProp.isVisible,
    });
  }

  render() {
    const images = [ ];
    if(this.state.images != undefined){
      for(i = 0; i < this.state.images.length; i++){
        images.push({source: {uri: this.state.images[i].path}, title: this.state.images[i].title, width: 806, height: 720 })
      }
    }
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
      <ImageView
        images={images}
        imageIndex={0}
        isVisible={this.state.isVisible}
        renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
      />
      </Container>
    );
  }
}
