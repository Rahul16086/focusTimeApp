import React from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonRounded from '../../components/ButtonRounded';

const TimeToggle = ({onChangeTime}) => {
  const styles = StyleSheet.create({
    timeToggleButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });
  return (
    <>
      <View style={styles.timeToggleButton}>
        <ButtonRounded
          size={75}
          title={'10m'}
          onPress={() => onChangeTime(10)}
        />
        <ButtonRounded
          size={75}
          title={'20m'}
          onPress={() => onChangeTime(20)}
        />
        <ButtonRounded
          size={75}
          title={'30m'}
          onPress={() => onChangeTime(30)}
        />
        <ButtonRounded
          size={75}
          title={'Reset'}
          onPress={() => onChangeTime(0)}
        />
      </View>
    </>
  );
};

export default TimeToggle;
