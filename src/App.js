import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, PermissionsAndroid} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

const App = () => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [scannedURL, setScannedURL] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log(granted);
    setCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  const handleBarCodeScanned = ({type, data}) => {
    setScannedURL(data);
    checkURL(data);
  };

  const checkURL = async url => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setResponseStatus('success');
      } else {
        setResponseStatus('error');
      }
    } catch (error) {
      setResponseStatus('error');
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <QRCodeScanner
        onRead={this.handleBarCodeScanned}
      flashMode={RNCamera.Constants.FlashMode.torch}
      />
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    width: 100,
    height: 100,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
