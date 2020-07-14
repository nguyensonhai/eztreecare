import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Font from "expo-font";
import Loader from "../shared/Loader";
export default class Home extends Component {
  state = {
    username: "nero",
    data: [],
    devices: [],
    assetsLoaded: false,
    device1On: false,
    device2On: false,
    deviceOn: require("../assets/images/onSwitch.png"),
    deviceOff: require("../assets/images/offSwitch.png"),
  };

  async componentDidMount() {
    await fetch(
      "https://doamdat.herokuapp.com/NhanTuServer.php?username=" +
        this.state.username
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
    this.updateDevicesStatus();
    this.interval = setInterval(() => {
      fetch(
        "https://doamdat.herokuapp.com/NhanTuServer.php?username=" +
          this.state.username
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ data: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
    this.setState({ assetsLoaded: true });
  }

  updateDevicesStatus = async () => {
    await fetch(
      "https://doamdat.herokuapp.com/ShowDevicesStatus_App.php?username=" +
        this.state.username
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ devices: responseJson });
        if (responseJson[0].device_status == "on") {
          this.setState({ device1On: true });
        } else {
          this.setState({ device1On: false });
        }
        if (responseJson[1].device_status == "on") {
          this.setState({ device2On: true });
        } else {
          this.setState({ device2On: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  toggleDevice = async (number) => {
    var request = new XMLHttpRequest();
    switch (number) {
      case 1:
        if (!this.state.device1On) {
          request.open(
            "GET",
            "http://doamdat.herokuapp.com/UpdateDevicesStatus.php?device_name=device1&device_status=on&username=" +
              this.state.username
          );
          request.send();
        } else {
          request.open(
            "GET",
            "http://doamdat.herokuapp.com/UpdateDevicesStatus.php?device_name=device1&device_status=off&username=" +
              this.state.username
          );
          request.send();
        }
        this.setState({ device1On: !this.state.device1On });
        break;
      case 2:
        if (!this.state.device2On) {
          request.open(
            "GET",
            "http://doamdat.herokuapp.com/UpdateDevicesStatus.php?device_name=device2&device_status=on&username=" +
              this.state.username
          );
          request.send();
        } else {
          request.open(
            "GET",
            "http://doamdat.herokuapp.com/UpdateDevicesStatus.php?device_name=device2&device_status=off&username=" +
              this.state.username
          );
          request.send();
        }
        this.setState({ device2On: !this.state.device2On });
        break;
      default:
        break;
    }
  };

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <ImageBackground
          source={require("../assets/images/greenBackground.jpg")}
          style={styles.container}
        >
          <Text style={styles.text}>Độ ẩm: {this.state.data[0].doam} </Text>

          <View style={styles.containerButton}>
            <View style={styles.butt}>
              <Text style={styles.textDevice}>Device 1</Text>
              <TouchableOpacity onPress={() => this.toggleDevice(1)}>
                <Image
                  style={styles.imageButt}
                  source={
                    this.state.device1On
                      ? this.state.deviceOn
                      : this.state.deviceOff
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={styles.butt}>
              <Text style={styles.textDevice}>Device 2</Text>
              <TouchableOpacity onPress={() => this.toggleDevice(2)}>
                <Image
                  style={styles.imageButt}
                  source={
                    this.state.device2On
                      ? this.state.deviceOn
                      : this.state.deviceOff
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 70 }}>
            <TouchableOpacity
              onPress={this.updateDevicesStatus}
              style={{ width: 130, height: 30 }}
            >
              <Text
                style={{
                  padding: 10,
                  fontFamily: "quicksand-regular",
                  fontSize: 20,
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: 200,
                  textAlign: "center",
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    } else {
      return <Loader loading={this.state.loading} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 20,
    marginBottom: 250,
    fontFamily: "quicksand-bold",
    fontSize: 40,
    color: "black",
    backgroundColor: "white",
    borderRadius: 200,
  },
  butt: {
    alignItems: "center",
    justifyContent: "center",
  },
  textDevice: {
    fontFamily: "quicksand-bold",
    fontSize: 22,
    color: "white",
  },
  imageButt: {
    marginTop: 20,
    width: 110,
    height: 55,
  },
  containerButton: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
