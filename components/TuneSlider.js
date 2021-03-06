import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {tuneSliderPropTypes} from '../propTypes/propTypes';
import Slider from '@react-native-community/slider';

const TuneSlider = (props) => {
  const {value, definition, onTunerChange, bottomMargin} = props;

  const onChange = (newValue) => {
    onTunerChange(newValue, definition.label);
  };

  return (
    <>
      <View style={{marginBottom: bottomMargin}}>
        <Text style={styles.sliderTitle}>{definition.label}</Text>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={definition.minValue}
            maximumValue={definition.maxValue}
            step={definition.step}
            value={value}
            onSlidingComplete={onChange}
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

TuneSlider.propTypes = tuneSliderPropTypes;

export default TuneSlider;
