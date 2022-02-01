import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import axios, { Axios } from "axios";
import { Component } from "react/cjs/react.production.min";

export default class HomeScreen extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      ListData: [],
      url: "http://localhost:5000/",
    };
  }

  ComponentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((Response) => {
        return this.setState({
          ListData: Response.data.data,
        });
      })
      .catch((Error) => {
        Alert.alert(Error.message);
      });
  };

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={"Planet:${item.name}"}
      subtitle={"Distance from Earth:${item.distance_from_earth}"}
      titleStyle={styles.Title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.Navigate("Details", { planet_name: item.name })
      }
    ></ListItem>
  );
  keyExtractor = (item, index) => index.toString();

  render() {
    const { ListData } = this.state
    if (ListData.length === 0) {
      return (
        <View style={style.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>PlanetsWorld</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList keyExtractor={this.keyExtractor}>
            data={this.state.ListData}
            renderItem={this.renderItem}
          </FlatList>
        </View>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}
