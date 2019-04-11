import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content,  Text, Button, List, Icon } from 'native-base';
import Checkbox from "./Checkbox";
import ImageViewer from "./ImageViewer.js";

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: this.props.indexQuestion,
      itemSelected: {},
      images: this.props.images,
      imageViewerVisible: false,
    }
    if(props.saved != undefined){
      this.state.itemSelected = props.saved;
    }
  }

  componentWillReceiveProps(nextProp){ //in order to fix an error when this component receive an update of the props param it set the image viewer to invisible
    this.setState({                   //in this particular case this fix the error in which the question isn't updated when the next question has the same typology of the showed question
      indexQuestion: nextProp.indexQuestion,
      itemSelected: {},
      images: nextProp.images,
      imageViewerVisible: false,
    });
    if(nextProp.saved != undefined){
      this.setState({
        itemSelected: nextProp.saved
      });
    }
  }

  update = (index, val) => {  //function in order to update this state and the relative state in the main component
    this.state.itemSelected[index] = val;
    this.props.save(this.state.indexQuestion, this.state.itemSelected);
  };

  renderList = (initialArr) => { //this function prepare the list of checkbox in order to add them in one time
    return initialArr.map((options, index) => {
      if(this.state.itemSelected[index] == undefined)//checks if the state hasn't been restored from the props.saved otherwise it set it to false
        this.state.itemSelected[index] = false;
      return (
        <Checkbox key={index} text={options.labels[0].content} updateState={this.update} checked={this.state.itemSelected[index]} index={index}/>
      );
    });
  }

  setImageViewerVisible = (value) => { //this function change the state of the imageviewer in order to set it visible or invisible
    this.setState({
      imageViewerVisible: value
    });
  }

  renderButtonImages = () => { //this function prepare the button that allows to show the image viewer
    if(this.state.images != undefined){
      return (<Button primary onPress={() => this.setImageViewerVisible(true)} style={styles.button}><Icon name="image"/><Text>Images</Text></Button>);
    }
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection:"column"}}>
        <Container style={{flex: 3}}>
          <Content>
            <List>
              {this.renderList(this.props.labels)}
            </List>
          </Content>
        </Container>
        <Container style={{flex: 1}}>
          {this.renderButtonImages()}
          <ImageViewer isVisible={this.state.imageViewerVisible} images={this.state.images}/>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      width:150,
      backgroundColor: '#FF9933'
    }
});
