/* Checkbox group is the component where the Multichoice questions are instantiated
*  calling the component Checkbox for each question.
*/

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, List, Icon, Item, Form, Body } from 'native-base';
import Checkbox from "./Checkbox";
import ImageViewer from "./ImageViewer.js";

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    var language = 0;
    var bool = false;
    for(language = 0; language < this.props.options[0].labels.length; language++){//searching the language between the proposed
      if(this.props.options[0].labels[language].language.toLowerCase() == this.props.language){
        bool = true;
        break;
      }
    }
    if(bool == false){//if the selected language isn't present, using english
      for(language = 0; language < this.props.options[0].labels.length; language++){//searching the language between the proposed
        if(this.props.options[0].labels[language].language.toLowerCase() == 'english'){
          break;
        }
      }
    }

    this.state = {
      options: this.props.options,
      indexQuestion: this.props.indexQuestion,
      itemSelected: {},
      images: this.props.images,
      imageViewerVisible: false,
      language: this.props.language,
      languageIndex: language
    }
    if(props.saved != undefined){
      this.state.itemSelected = props.saved;
    }
    this.props.save(this.state.indexQuestion, this.state.itemSelected);
  }

  // In order to fix an error when this component receive an update of the props param it set the image viewer to invisible
  componentWillReceiveProps(nextProp){ 
    this.setState({                   //in this particular case this fix the error in which the question isn't updated when the next question has the same typology of the showed question
      indexQuestion: nextProp.indexQuestion,
      itemSelected: {},
      images: nextProp.images,
      imageViewerVisible: false,
    });
    this.props.save(nextProp.indexQuestion, {});
    if(nextProp.saved != undefined){
      this.setState({
        itemSelected: nextProp.saved
      });
      this.props.save(nextProp.indexQuestion, nextProp.saved);
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
        <Checkbox key={index} text={options.labels[this.state.languageIndex].content} updateState={this.update} checked={this.state.itemSelected[index]} index={index}/>
      );
    });
  }

  setImageViewerVisible = (value) => { //this function change the state of the imageviewer in order to set it visible or invisible
    this.setState({
      imageViewerVisible: value
    });
  }

  renderButtonImages = () => { //this function prepare the button that allows to show the image viewer
    if(this.state.images != undefined && this.state.images.length != 0){
      return (<Button primary onPress={() => this.setImageViewerVisible(true)} style={styles.button}><Icon name="image"/><Text>Flashcards</Text></Button>);
    }
  }

  render() {
    return (
      <Form style={{alignSelf: 'stretch'}}>
        <List>
          {this.renderList(this.state.options)}
        </List>
        <Item>
          <Body>
            {this.renderButtonImages()}
          </Body>
        </Item>
        <ImageViewer isVisible={this.state.imageViewerVisible} images={this.state.images}/>
      </Form>      
    );
  }
} 

const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      width: 170,
      backgroundColor: '#FF9933'
    }
});
