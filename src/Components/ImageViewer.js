import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Icon, Button, Left, Right } from 'native-base';
import ImageView from 'react-native-image-view';

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      isVisible: props.isVisible,
      index: 0,
      controls:{
        close: true, // Component for close button in up right corner, as onPress prop accepts function to close modal
        next: true, // Component for next image button, as onPress prop accepts function to scroll to next image
        prev: true, // Component for previous image button, as onPress prop accepts function to scroll to previous image
      }
    }
  }

  componentWillReceiveProps(nextProp){ //when the component receive an update it set the state of the imageviewer as the prop state
    this.setState({
      isVisible: nextProp.isVisible,
    });
  }

  render() {
    const images = [ ];
    if(this.state.images != undefined){
      for(i = 0; i < this.state.images.length; i++){
        images.push({source: {uri: this.state.images[i].path}, title: this.state.images[i].title, width: 400, height: 400 })
      }
    }

    return (
      <ImageView
        glideAlways
        images={images}
        controls={this.state.controls}
        imageIndex={this.state.index}
        isVisible={this.state.isVisible}
        onClose={() => this.setState({isVisible: false})}
      />
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width:150,
      backgroundColor: '#2b2d42'
    }
});
