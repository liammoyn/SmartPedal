import React from 'react';
import {StyleSheet, View} from 'react-native';
import {tuneGroupPropTypes} from '../resources/propTypes/propTypes';
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
            {selectedEffect.tunersDefinition.map((td, index) => {
              return (
                <TuneSlider
                  key={td.label}
                  value={selectedEffect.tuners[td.label]}
                  definition={td}
                  onTunerChange={onTunerChange}
                  bottomMargin={
                    index === selectedEffect.tunersDefinition.length - 1
                      ? 0
                      : 10
                  }
                />
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slidersContainer: {
    paddingBottom: 10,
  },
});

TuneGroup.propTypes = tuneGroupPropTypes;

export default TuneGroup;
