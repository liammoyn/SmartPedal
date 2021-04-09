import PropTypes from 'prop-types';

/* General Prop Types */

const effectIdPropType = PropTypes.number;

/* Definition Prop Types*/

const tunerDefinitionPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
});

const tunersDefinitionPropType = PropTypes.arrayOf(tunerDefinitionPropType);

const effectDefinitionPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: effectIdPropType.isRequired,
  isDigital: PropTypes.bool.isRequired,
  tuners: tunersDefinitionPropType.isRequired,
});

const availableEffectsPropType = PropTypes.arrayOf(effectDefinitionPropType);

/* Instance Prop Types */

const tunerInstancePropType = PropTypes.objectOf(PropTypes.number);

const effectInstancePropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  id: effectIdPropType.isRequired,
  isDigital: PropTypes.bool.isRequired,
  tuners: tunerInstancePropType.isRequired,
  tunersDefinition: tunersDefinitionPropType.isRequired,
});

const defaultEffectPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
});

const pedalDataInstancePropType = PropTypes.shape({
  // Both effects can be null
  mainEffect: effectInstancePropType,
  chainedEffect: effectInstancePropType,
});

/* Component Prop Types */

export const pedalPropTypes = {
  pedalNumber: PropTypes.number.isRequired,
  availableEffects: availableEffectsPropType.isRequired,
  data: pedalDataInstancePropType.isRequired,
  updateData: PropTypes.func.isRequired,
};

export const effectGroupPropTypes = {
  expanded: PropTypes.bool.isRequired,
  selectedEffect: effectInstancePropType, // Can be null
  updateEffect: PropTypes.func.isRequired,
  defaultEffect: defaultEffectPropType.isRequired,
  eligibleEffects: availableEffectsPropType.isRequired,
};

export const tuneGroupPropTypes = {
  selectedEffect: effectInstancePropType,
  onTunerChange: PropTypes.func.isRequired,
};

export const tuneSliderPropTypes = {
  value: PropTypes.number.isRequired,
  definition: tunerDefinitionPropType.isRequired,
  onTunerChange: PropTypes.func.isRequired,
  bottomMargin: PropTypes.number.isRequired,
};
