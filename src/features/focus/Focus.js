import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RootTagContext} from 'react-native/Libraries/ReactNative/RootTag';
import ButtonRounded from '../../components/ButtonRounded';
import {fontSize, spacing} from '../../utils/sizes';

const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 0.5,
    },
    subContainer: {
      flex: 1,
      padding: spacing.md,
      justifyContent: 'center',
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontSize.lg,
    },
    inputContainer: {
      paddingTop: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      marginRight: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({nativeEvent}) => {
              setSubject(nativeEvent.text);
            }}
          />
          <ButtonRounded
            title={'+'}
            size={50}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Focus;
