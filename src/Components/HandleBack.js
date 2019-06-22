import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { BackHandler, Alert } from "react-native";

class HandleBack extends Component {
  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener("didFocus", payload =>
      BackHandler.addEventListener("hardwareBackPress", this.onBack),
    );
  }

  componentDidMount() {
    this.willBlur = this.props.navigation.addListener("willBlur", payload =>
      BackHandler.removeEventListener("hardwareBackPress", this.onBack),
    );
  }

  onBack = () => {
    Alert.alert(
      "You're still editing!",
      "Please answer to all the questions, or close the session with the stop session button.",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: false },
    );
    return true;
  };

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  render() {
    return this.props.children;
  }
}

export default withNavigation(HandleBack);