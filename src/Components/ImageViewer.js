import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import ImageView from 'react-native-image-view';

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      isVisible: props.isVisible,
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
        images={images}
        imageIndex={0}
        isVisible={this.state.isVisible}
        renderArrowLeft={(currentImage) => <Icon name='arrow-back'/>}
        renderArrowRight={(currentImage) => <Icon name='arrow-forward'/>}
        renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
      />
    );
  }
}
