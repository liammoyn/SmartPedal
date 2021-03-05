import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import _ from 'lodash';
import Pedal from './Pedal';

const Content = () => {
  const [lastSendData, setLastSentData] = useState(defaultPedalsData);
  const [data, setData] = useState(defaultPedalsData);
  const [dataChanged, setDataChanged] = useState(false);

  const updatePedalState = (newPedalState, pedalName) => {
    const updatedData = {
      ...data,
      [pedalName]: newPedalState,
    };
    setDataChanged(!_.isEqual(updatedData, lastSendData));
    setData(updatedData);
  };

  const revertChanges = () => {
    setData(lastSendData);
    setDataChanged(false);
  };

  const applyChanges = () => {
    // TODO: Send "data" in an http request
    setLastSentData(data);
    setDataChanged(false);
  };

  // TODO: Enforce don't sandwich analog/digital effects

  return (
    <>
      <View style={styles.pageContainer}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Smart Pedal Multi-Effect</Text>
        </View>
        <View style={styles.buttonBar}>
          <View style={styles.revertButtonContainer}>
            <Button
              disabled={!dataChanged}
              style={styles.button}
              color="#fff"
              onPress={revertChanges}
              title="Revert Changes"
            />
          </View>
          <View style={styles.applyButtonContainer}>
            <Button
              disabled={!dataChanged}
              style={styles.button}
              color="#fff"
              onPress={applyChanges}
              title="Apply Changes"
            />
          </View>
        </View>
        <View style={styles.effectsContainer}>
          <ScrollView>
            <Pedal
              pedalNumber={1}
              availableEffects={allEffects}
              data={data.pedal1}
              updateData={(d) => updatePedalState(d, 'pedal1')}
            />
            <Pedal
              pedalNumber={2}
              availableEffects={allEffects}
              data={data.pedal2}
              updateData={(d) => updatePedalState(d, 'pedal2')}
            />
            <Pedal
              pedalNumber={3}
              availableEffects={allEffects}
              data={data.pedal3}
              updateData={(d) => updatePedalState(d, 'pedal3')}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const defaultPedalsData = {
  pedal1: {
    mainEffect: null,
    chainedEffect: null,
  },
  pedal2: {
    mainEffect: null,
    chainedEffect: null,
  },
  pedal3: {
    mainEffect: null,
    chainedEffect: null,
  },
};

const allEffects = require('../effects/allEffects.json');

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
