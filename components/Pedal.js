import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import EffectGroup from './EffectGroup';

const Pedal = (props) => {
  const pedalNumber = props.pedalNumber;

  const [expanded, setExpanded] = useState(false);
  const [icon, setIcon] = useState(icons.up);

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleAdditionalEffect = () => {
    setUseAdditionalEffect(!useAdditionalEffect);
  };

  const updateEffect = (value, isPrimaryEffect) => {
    const maybeSelectedItem = items.find((i) => i.value === value);
    const selectedItem = maybeSelectedItem ? maybeSelectedItem : defaultEffect;

    if (isPrimaryEffect) {
      setSelectedEffect(selectedItem);
    } else {
      setAdditionalEffect(selectedItem);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topLine}>
          <Text style={styles.titleText}>Pedal {pedalNumber}</Text>
          <TouchableWithoutFeedback onPress={toggleExpand}>
            <Image source={icon} style={styles.arrowImage} />
          </TouchableWithoutFeedback>
        </View>
        <EffectGroup
          expanded={expanded}
          selectedEffect={selectedEffect}
          onEffectChange={(value) => updateEffect(value, true)}
          defaultEffect={defaultEffect}
          eligibleEffects={items}>
          {selectedEffect !== defaultEffect && !useAdditionalEffect && (
            <View style={styles.additionalEffectButton}>
              <Button
                color="#000"
                onPress={toggleAdditionalEffect}
                title="Chain an Additional Effect"
              />
            </View>
          )}
        </EffectGroup>
        {useAdditionalEffect && (
          <EffectGroup
            expanded={expanded}
            selectedEffect={additionalEffect}
            onEffectChange={(value) => updateEffect(value, false)}
            defaultEffect={defaultEffect}
            eligibleEffects={items}>
            {useAdditionalEffect && (
              <View style={styles.additionalEffectButton}>
                <Button
                  color="#000"
                  onPress={toggleAdditionalEffect}
                  title="Remove Additional Effect"
                />
              </View>
            )}
          </EffectGroup>
        )}
      </View>
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#EEE',
    overflow: 'hidden',
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
  arrowImage: {
    height: 30,
    width: 30,
  },
  additionalEffectButton: {
    backgroundColor: '#DDD',
    borderRadius: 4,
    width: 225,
  },
});

export default Pedal;
