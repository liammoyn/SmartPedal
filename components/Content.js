/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import Pedal from './Pedal';

const Content = () => {
  const buttonPress = () => {
    alert('You tapped the button!');
  };

  return (
    <>
      <View style={styles.pageContainer}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Smart Pedal Multi-Effect</Text>
        </View>
        <View style={styles.buttonBar}>
          <View style={styles.revertButtonContainer}>
            <Button
              style={styles.button}
              color="#fff"
              onPress={buttonPress}
              title="Revert Changes"
            />
          </View>
          <View style={styles.applyButtonContainer}>
            <Button
              style={styles.button}
              color="#fff"
              onPress={buttonPress}
              title="Apply Changes"
            />
          </View>
        </View>
        <View style={styles.effectsContainer}>
          <ScrollView>
            <Pedal pedalNumber={1} />
            <Pedal pedalNumber={2} />
            <Pedal pedalNumber={3} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  headerBar: {
    backgroundColor: '#C4C4C4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '400',
    fontSize: 24,
    textAlign: 'center',
    padding: 25,
  },
  buttonBar: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    margin: 10,
  },
  applyButtonContainer: {
    backgroundColor: '#00C113',
    borderRadius: 4,
  },
  revertButtonContainer: {
    backgroundColor: '#C11300',
    borderRadius: 4,
  },
  button: {
    padding: 4,
  },
  effectsContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 10,
    margin: 5,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
});

export default Content;
