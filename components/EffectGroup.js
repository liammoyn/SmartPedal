import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Animated} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {effectGroupPropTypes} from '../resources/propTypes/propTypes';
import TuneGroup from './TuneGroup';

const EffectGroup = (props) => {
  const {
    expanded,
    selectedEffect,
    updateEffect,
    defaultEffect,
    eligibleEffects,
  } = props;

  const [animation, _0] = useState(new Animated.Value(96)); // TODO: Add an onMount thing to set this properly to the right height
  const [animation2, _1] = useState(new Animated.Value(200));
  const [textAnimation, _2] = useState(new Animated.Value(80));

  const [topHeight, setTopHeight] = useState(1);
  const [bottomHeight, setBottomHeight] = useState(1);

  useEffect(() => {
    let finalValue = expanded ? bottomHeight + topHeight : topHeight;
    animation2.setValue(finalValue);
  }, [bottomHeight, topHeight]);

  useEffect(() => {
    let initialValue = expanded ? topHeight : topHeight + bottomHeight;
    let finalValue = expanded ? bottomHeight + topHeight : topHeight;
    animation.setValue(initialValue);
    animation2.setValue(finalValue);

    Animated.spring(animation, {
      toValue: animation2,
      useNativeDriver: false,
    }).start();

    let ivWidth = expanded ? 80 : 100;
    let fvWidth = expanded ? 100 : 80;
    textAnimation.setValue(ivWidth);
    Animated.timing(textAnimation, {
      toValue: fvWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const defineTopHeight = (event) => {
    const height = event.nativeEvent.layout.height + 10;
    setTopHeight(height);
  };

  const defineBottomHeight = (event) => {
    const height = event.nativeEvent.layout.height;
    setBottomHeight(height);
  };

  const effectDefinitionToInstance = (definitionEffect) => {
    return {
      label: definitionEffect.label,
      id: definitionEffect.value,
      isDigital: definitionEffect.isDigital,
      tuners: Object.fromEntries(
        definitionEffect.tuners.map((tunerDefinition) => {
          return [tunerDefinition.label, tunerDefinition.minValue];
        }),
      ),
      tunersDefinition: definitionEffect.tuners,
    };
  };

  // Value is a effectDefinitionPropType
  // updateEffect takes a effectInstancePropType
  const onEffectChange = (id) => {
    const maybeNewSelectedEffect = eligibleEffects.find((e) => e.value === id);
    const newSelectedEffect =
      maybeNewSelectedEffect === undefined
        ? null
        : effectDefinitionToInstance(maybeNewSelectedEffect);
    updateEffect(newSelectedEffect);
  };

  const onTunerChange = (newValue, label) => {
    const newTuners = {
      ...selectedEffect.tuners,
      [label]: newValue,
    };
    const newEffect = {
      ...selectedEffect,
      tuners: newTuners,
    };
    updateEffect(newEffect);
  };

  return (
    <>
      <Animated.View style={[styles.betterNameContainer, {height: animation}]}>
        <View style={styles.topContent} onLayout={defineTopHeight}>
          <Animated.View
            style={{
              ...styles.effectBox,
              width: textAnimation.interpolate({
                inputRange: [80, 100],
                outputRange: ['80%', '100%'],
              }),
            }}>
            {expanded ? (
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={onEffectChange}
                value={selectedEffect?.id}
                placeholder={defaultEffect}
                items={eligibleEffects}
                Icon={() => {
                  return (
                    <Image
                      source={icons.ellipsis}
                      style={styles.ellipsisImage}
                    />
                  );
                }}
              />
            ) : (
              <Text
                style={{
                  ...styles.effectText,
                  color: selectedEffect === null ? '#c7c7cd' : 'black',
                }}>
                {selectedEffect === null
                  ? defaultEffect.label
                  : selectedEffect.label}
              </Text>
            )}
          </Animated.View>
        </View>
        <View style={styles.bottomContent} onLayout={defineBottomHeight}>
          <View style={styles.tunerGroup}>
            <TuneGroup
              selectedEffect={selectedEffect}
              onTunerChange={onTunerChange}
            />
          </View>
          <View>{props.children}</View>
        </View>
      </Animated.View>
    </>
  );
};

const icons = {
  ellipsis: require('../resources/images/ellipsis.png'),
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingLeft: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingLeft: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  betterNameContainer: {
    width: '100%',
    backgroundColor: '#EEE',
    overflow: 'hidden',
  },
  topContent: {
    paddingHorizontal: 10,
    paddingBottom: 0,
    paddingTop: 2,
  },
  effectBox: {
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
    marginBottom: 8,
  },
  effectText: {
    fontSize: 20,
    paddingVertical: 12,
    paddingLeft: 4,
    color: 'black',
  },
  ellipsisImage: {
    marginRight: 4,
    marginTop: 12,
    height: 26,
    width: 26,
  },
  bottomContent: {
    padding: 10,
  },
  tunerGroup: {
    marginBottom: 30,
  },
});

EffectGroup.propTypes = effectGroupPropTypes;

export default EffectGroup;
