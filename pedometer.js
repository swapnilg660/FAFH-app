import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-legacy";

export default class CountIt extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount((result) => {
      console.log("Step count: ", result);
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        console.log("past setep count: ", result);
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {"\n"}Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          {"\n"}Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>
          {"\n"}Steps counter: {this.state.currentStepCount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
