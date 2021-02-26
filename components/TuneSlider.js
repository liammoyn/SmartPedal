import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Slider from '@react-native-community/slider';

const TuneSlider = () => {
  return (
    <>
      <View>
        <Text style={styles.sliderTitle}>Tuner 1</Text>
        <View style={styles.sliderContainer}>
          <Slider
            // style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderTitle: {
    fontWeight: '400',
    fontSize: 18,
  },
  sliderContainer: {
    backgroundColor: '#CCC',
    borderRadius: 4,
    paddingRight: 4,
    paddingLeft: 4,
  },
});

export default TuneSlider;
