import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {pedalPropTypes} from '../propTypes/propTypes';
import EffectGroup from './EffectGroup';

const Pedal = (props) => {
  const {pedalNumber, availableEffects, data, updateData} = props;

  const [expanded, setExpanded] = useState(false);
  const [icon, setIcon] = useState(icons.up);

  const [useAdditionalEffect, setUseAdditionalEffect] = useState(false);

  // TODO: Somehow have to (maybe) set useAdditionalEffect when revert changes is clicked
  useEffect(() => {
    if (data.mainEffect === null) {
      setUseAdditionalEffect(false);
    } else if (data.chainedEffect !== null) {
      setUseAdditionalEffect(true);
    }
  }, [data]);

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
    const newUseAdditionalEffect = !useAdditionalEffect;
    if (!newUseAdditionalEffect) {
      updateEffect(null, false);
    }
    setUseAdditionalEffect(newUseAdditionalEffect);
  };

  const updateEffect = (value, isPrimaryEffect) => {
    // If getting rid of primary event, clear chained effect too
    if (isPrimaryEffect && value === null) {
      updateData({
        mainEffect: null,
        chainedEffect: null,
      });
    } else {
      const effectTypeLabel = isPrimaryEffect ? 'mainEffect' : 'chainedEffect';
      updateData({
        ...data,
        [effectTypeLabel]: value,
      });
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
          selectedEffect={data.mainEffect}
          updateEffect={(value) => updateEffect(value, true)}
          defaultEffect={defaultEffect}
          eligibleEffects={availableEffects}>
          {data.mainEffect !== null && !useAdditionalEffect && (
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
            selectedEffect={data.chainedEffect}
            updateEffect={(value) => updateEffect(value, false)}
            defaultEffect={defaultEffect}
            eligibleEffects={availableEffects}>
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

Pedal.propTypes = pedalPropTypes;

export default Pedal;
