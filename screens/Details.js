import { Axios } from "axios";
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
import { Card } from "react-native-elements";
import { Component } from "react/cjs/react.production.min";

export default class DetailsScreen extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      Details: [],
      imagePath: "",
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { url } = this.state;
    Axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      })
  }

  setDetails = planetDetails => {
    const planet_type = planetDetails.planet_type;
    let imagePath = "";
    switch (planet_type) {
      case "Gas Giant":
        imagePath = require("../assets/gas_giant.png")
        break;

      case "Neptune Like":
        imagePath = require("../assets/neptune_like.png")
        break;

      case "Super Earth":
        imagePath = require("../assets/super_earth.png")
        break;

      case "Terrestrial":
        imagePath = require("../assets/terrestrial.png")
        break;

      default:
        imagePath = require("../assets/gas_giant.png")
    }

    this.setState({ Details: planetDetails, imagePath: imagePath })
  }

  render() {
    const { Details, imagePath } = this.state;
    if (Details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={Details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text style={styles.cardItem}>
                {'Distance from Earth: ${Details.distance_from_earth}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Distance from Sun: ${Details.distance_from_sun}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Gravity: ${Details.gravity}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Orbital Period: ${Details.orbital_period}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Orbital Speed: ${Details.orbital_speed}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Planet Mass: ${Details.planet_mass}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Planet Radius: ${Details.planet_radius}'}
              </Text>
              <Text style={styles.cardItem}>
                {'Planet Type: ${Details.planet_type}'}
              </Text>
            </View>

            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>
                {Details.specifications ? 'Specifications:' : ""}
              </Text>

              {Details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}> {item} </Text>
              ))}

            </View>

          </Card>
        </View>
      );
    }
    return null;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
})