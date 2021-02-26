import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Button,
} from 'react-native';
import TuneSlider from './TuneSlider';
import RNPickerSelect from 'react-native-picker-select';
import TuneGroup from './TuneGroup';

const Pedal = (params) => {
  const pedalNumber = params.pedalNumber;

  const [animation, _0] = useState(new Animated.Value(96)); // TODO: Add an onMount thing to set this properly to the right height
  const [animation2, _1] = useState(new Animated.Value(200));

  const [expanded, setExpanded] = useState(false);
  const [icon, setIcon] = useState(icons.up);
  const [topHeight, setTopHeight] = useState(1);
  const [bottomHeight, setBottomHeight] = useState(1);

  const [textAnimation, _2] = useState(new Animated.Value(80));
  const [selectedEffect, setSelectedEffect] = useState(defaultEffect);

  const [useAdditionalEffect, setUseAdditionalEffect] = useState(false);
  const [additionalEffect, setAdditionalEffect] = useState(defaultEffect);

  useEffect(() => {
    if (expanded) {
      setIcon(icons.down);
    } else {
      setIcon(icons.up);
    }
  }, [expanded]);

  useEffect(() => {
    let finalValue = expanded ? bottomHeight + topHeight : topHeight;
    animation2.setValue(finalValue);
  }, [expanded, bottomHeight, topHeight]);

  const toggleExpand = () => {
    let initialValue = expanded ? topHeight + bottomHeight : topHeight;
    let finalValue = expanded ? topHeight : bottomHeight + topHeight;
    animation.setValue(initialValue);
    animation2.setValue(finalValue);

    Animated.spring(animation, {
      toValue: animation2,
      useNativeDriver: false,
    }).start();

    // let ivWidth = expanded ? 100 : 80;
    let fvWidth = expanded ? 80 : 100;
    // textAnimation.setValue(ivWidth);
    Animated.timing(textAnimation, {
      toValue: fvWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const defineTopHeight = (event) => {
    const height = event.nativeEvent.layout.height + 20;
    // This only works because the top height is set once and then not set again
    animation.setValue(height);
    setTopHeight(height);
  };

  const defineBottomHeight = (event) => {
    const height = event.nativeEvent.layout.height;
    setBottomHeight(height);
  };

  const updateEffect = (value, isAdditionalEffect) => {
    const maybeSelectedItem = items.find((i) => i.value === value);
    const selectedItem = maybeSelectedItem ? maybeSelectedItem : defaultEffect;

    if (isAdditionalEffect) {
      setAdditionalEffect(selectedItem);
    } else {
      setSelectedEffect(selectedItem);
    }
  };

  const toggleAdditionalEffect = () => {
    setUseAdditionalEffect(!useAdditionalEffect);
  };

  return (
    <>
      <Animated.View style={[styles.container, {height: animation}]}>
        <View style={styles.topContent} onLayout={defineTopHeight}>
          <View style={styles.topLine}>
            <Text style={styles.titleText}>Pedal {pedalNumber}</Text>
            <TouchableWithoutFeedback onPress={toggleExpand}>
              <Image source={icon} style={styles.arrowImage} />
            </TouchableWithoutFeedback>
          </View>
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
                onValueChange={(value) => updateEffect(value, false)}
                value={selectedEffect.value}
                placeholder={defaultEffect}
                items={items}
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
                  color: selectedEffect === defaultEffect ? '#c7c7cd' : 'black',
                }}>
                {selectedEffect.label}
              </Text>
            )}
          </Animated.View>
        </View>
        <View style={styles.bottomContent} onLayout={defineBottomHeight}>
          {selectedEffect.value !== null && (
            <View>
              <View style={styles.tunerGroup}>
                <TuneGroup selectedEffect={selectedEffect} />
              </View>
              <View>
                {!useAdditionalEffect ? (
                  <View style={styles.additionalEffectButton}>
                    <Button
                      color="#000"
                      onPress={toggleAdditionalEffect}
                      title="Chain an Additional Effect"
                    />
                  </View>
                ) : (
                  <View>
                    <View style={styles.effectBox}>
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) => updateEffect(value, true)}
                        value={additionalEffect.value}
                        placeholder={defaultEffect}
                        items={items}
                        Icon={() => {
                          return (
                            <Image
                              source={icons.ellipsis}
                              style={styles.ellipsisImage}
                            />
                          );
                        }}
                      />
                    </View>
                    <View style={styles.tunerGroup}>
                      <TuneGroup selectedEffect={additionalEffect} />
                    </View>
                    <View style={styles.additionalEffectButton}>
                      <Button
                        color="#000"
                        onPress={toggleAdditionalEffect}
                        title="Remove Additional Effect"
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
};

const defaultEffect = {
  label: 'Select an effect',
  value: null,
};
const items = [
  {label: 'Reverb', value: 'reverb'},
  {label: 'Echo', value: 'echo'},
  {label: 'Amplify', value: 'amplify'},
];

const icons = {
  up: require('../images/expand-arrow-up.png'),
  down: require('../images/expand-arrow-down.png'),
  ellipsis: require('../images/ellipsis.png'),
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
  container: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10, // TODO: Need to figure this into the calculations dynamically
    backgroundColor: '#EEE',
    overflow: 'hidden',
  },
  topContent: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 2,
  },
  topLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 8,
  },
  effectBox: {
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
    marginBottom: 14,
  },
  effectText: {
    fontSize: 20,
    paddingVertical: 12,
    paddingLeft: 4,
    color: 'black',
  },
  arrowImage: {
    height: 30,
    width: 30,
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
  additionalEffectButton: {
    backgroundColor: '#DDD',
    borderRadius: 4,
    width: 225,
  },
});

export default Pedal;
