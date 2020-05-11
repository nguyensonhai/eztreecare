import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';
import Loader from './shared/Loader';
export default class App extends Component {

  state = {
    data: [],
    devices: [],
    assetsLoaded: false,
    device1On: false,
    device2On: false,
    deviceOn: require('./assets/images/onSwitch.png'),
    deviceOff: require('./assets/images/offSwitch.png'),
  }

  async componentDidMount() {
    await Font.loadAsync({
      'quicksand-regular': require('./assets/fonts/Quicksand-Regular.ttf'),
      'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
      'quicksand-light': require('./assets/fonts/Quicksand-Light.ttf'),
      'quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
      'quicksand-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    });
    await fetch('https://appdodoam.herokuapp.com/NhanTuServer.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson })
        if(responseJson[0].device_status == 'on') {
          this.setState({ device1On: true });
        }
      })
      .catch(error => {
        console.error(error);
      });
    await fetch('https://appdodoam.herokuapp.com/ShowDevices.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ devices: responseJson })
        if(responseJson[1].device_status == 'on') {
          this.setState({ device2On: true });
        }
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ assetsLoaded: true });
    this.interval = setInterval(
      () => {
        fetch('https://appdodoam.herokuapp.com/NhanTuServer.php')
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ data: responseJson })
          })
          .catch(error => {
            console.error(error);
          });
        fetch('https://appdodoam.herokuapp.com/ShowDevices.php')
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ devices: responseJson })
          })
          .catch(error => {
            console.error(error);
          });
      },
      500
    );
  }

  toggleDevice = async number => {
    var request = new XMLHttpRequest();
    switch (number) {
      case 1:
        if (!this.state.device1On) {
          request.open('GET', 'http://appdodoam.herokuapp.com/UpdateDevicesStatus.php?device_name=device1&device_status=on');
          request.send();
        } else {
          request.open('GET', 'http://appdodoam.herokuapp.com/UpdateDevicesStatus.php?device_name=device1&device_status=off');
          request.send();
        }
        this.setState({ device1On: !this.state.device1On });
        break;
      case 2:
        if (!this.state.device2On) {
          request.open('GET', 'http://appdodoam.herokuapp.com/UpdateDevicesStatus.php?device_name=device2&device_status=on');
          request.send();
        } else {
          request.open('GET', 'http://appdodoam.herokuapp.com/UpdateDevicesStatus.php?device_name=device2&device_status=off');
          request.send();
        }
        this.setState({ device2On: !this.state.device2On })
        break;
      default:
        break;
    }
  }

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <ImageBackground source={require('./assets/images/greenBackground.jpg')} style={styles.container}>
          <Text style={styles.text}>Độ ẩm: {this.state.data[0].doam} </Text>

          <View style={styles.containerButton}>

            <View style={styles.butt}>
              <Text style={styles.textDevice} >Device 1</Text>
              <TouchableOpacity onPress={() => this.toggleDevice(1)}>
                <Image style={styles.imageButt} source={this.state.device1On ? this.state.deviceOn : this.state.deviceOff} />
              </TouchableOpacity>
            </View>

            <View style={styles.butt}>
              <Text style={styles.textDevice} >Device 2</Text>
              <TouchableOpacity onPress={() => this.toggleDevice(2)}>
                <Image style={styles.imageButt} source={this.state.device2On ? this.state.deviceOn : this.state.deviceOff} />
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>
      );
    }
    else {
      return (
        <Loader
          loading={this.state.loading} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 20,
    marginBottom: 250,
    fontFamily: 'quicksand-bold',
    fontSize: 40,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 200
  },
  butt: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textDevice: {
    fontFamily: 'quicksand-bold',
    fontSize: 22,
    color: 'white',
  },
  imageButt: {
    marginTop: 20,
    width: 110,
    height: 55,
  },
  containerButton: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  }
});
