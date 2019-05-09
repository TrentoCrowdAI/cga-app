import React, { Component } from "react";
import { Container, Content, Picker, Form, Item, Label } from "native-base";

export default class MyPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: props.indexQuestion,
      labels: props.labels,
      selected: undefined
    };
    this.props.save(this.state.indexQuestion, props.labels[0].key);
  }

  onValueChange(value: string) {//function in order to update this state and the relative state in the main component
    this.setState({
      selected: value
    });
    this.props.save(this.state.indexQuestion, value);
  }

  renderItems = () => { //this function prepare the MyPicker item based on the received datas
    return(
      <Item picker >
        <Label>Type</Label>
        <Picker
          mode="dropdown"
          placeholder="Select One"
          placeholderStyle={{ color: "#2874F0" }}
          note={false}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
        {
          this.state.labels.map((option, index) => {
            return <Picker.Item key={index} label={option.label} value={option.key} />
          })
        }
        </Picker>
      </Item>
    );
  }

  render() {
    return (
      <Form style={{alignSelf: 'stretch'}}>
        {this.renderItems()}
      </Form>
    );
  }
}
