import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const URLRequest = ({ url }) => {
  const [responseStatus, setResponseStatus] = useState(null);

  const checkURL = async () => {
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

  React.useEffect(() => {
    checkURL();
  }, [url]);

  return (
    <View style={styles.container}>
      {responseStatus === 'success' && (
        <Image
          source={require('./assets/green-tick.png')}
          style={styles.tickIcon}
        />
      )}
      {responseStatus === 'error' && (
        <Text style={styles.errorText}>Error: Unable to connect to the URL</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default URLRequest;