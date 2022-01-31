import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonRounded = ({style = {}, textStyle = {}, size = 125, ...props}) => {
  const styles = StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: 2,
    },
    text: {
      color: 'white',
      fontSize: size / 3,
    },
  });
  return (
    <TouchableOpacity style={[styles.radius, style]} onPress={props.onPress}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRounded;
