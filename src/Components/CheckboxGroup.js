import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Radio, Right, Left, List, CheckBox, Button} from 'native-base';
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

  update = (index, val) => {
    this.state.itemSelected[index] = val;
    this.props.save(this.state.indexQuestion, this.state.itemSelected);
  };

  renderList(initialArr) {
    return initialArr.map((options, index) => {
      if(this.state.itemSelected[index] == undefined)
        this.state.itemSelected[index] = false;
      return (
        <Checkbox key={index} text={options.labels[0].content} updateState={this.update} checked={this.state.itemSelected[index]} index={index}/>
      );
    });
  }

  showImageViewer = () => {
    this.setState({
      imageViewerVisible: true
    });
  }

  renderButtonImages = () => {
    if(this.state.images != undefined){
      return (<Button primary onPress={() => this.showImageViewer()}><Text>Images</Text></Button>);
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.renderList(this.props.labels)}
            {this.renderButtonImages()}
            <ImageViewer isVisible={this.state.imageViewerVisible} images={this.state.images}/>
          </List>
        </Content>
      </Container>
    );
  }
}
