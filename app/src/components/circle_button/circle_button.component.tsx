import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Icon, useStyleSheet} from '@ui-kitten/components';

import styles from './circle_button.styles';

type CirclerButtonProps = {
  onPress(): void;
};

const CircleButton: React.FC<CirclerButtonProps> = ({onPress}) => {
  const circleButtonStyles = useStyleSheet(styles);

  return (
    <View style={circleButtonStyles.body}>
      <TouchableOpacity
        onPress={onPress}
        style={circleButtonStyles.touch}
        activeOpacity={0.7}>
        <Text status="primary">add clip</Text>
        <View style={circleButtonStyles.iconWrapper}>
          <Icon
            style={circleButtonStyles.icon}
            name="plus-outline"
            fill="#fff"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CircleButton;
