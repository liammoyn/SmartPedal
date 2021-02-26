import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TuneSlider from './TuneSlider';

const TuneGroup = (props) => {
  const selectedEffect = props.selectedEffect;
  return (
    <>
      <View>
        {selectedEffect.value === null ? (
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
  slidersContainer: {

  },
});

export default TuneGroup;
