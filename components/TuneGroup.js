import React from 'react';
import {StyleSheet, View} from 'react-native';
import {tuneGroupPropTypes} from '../propTypes/propTypes';
import TuneSlider from './TuneSlider';

const TuneGroup = (props) => {
  // TODO: Need to get the effect definition not just effect instance
  const {selectedEffect, onTunerChange} = props;
  return (
    <>
      <View>
        {selectedEffect === null ? (
          <View />
        ) : (
          <View style={styles.slidersContainer}>
            <TuneSlider />
            <TuneSlider />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slidersContainer: {},
});

TuneGroup.propTypes = tuneGroupPropTypes;

export default TuneGroup;
