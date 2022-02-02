import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {fontSize, spacing} from '../../utils/sizes';
import ButtonRounded from '../../components/ButtonRounded';

const FocusHistory = ({focusHistory, onClear}) => {
  const HistoryItem = ({item, index}) => {
    return (
      <Text style={styles.historyItem(item.completion)}>{item.subject}</Text>
    );
  };

  const styles = StyleSheet.create({
    historyItem: status => ({
      color: status ? 'green' : 'red',
      fontSize: fontSize.md,
    }),
    title: {
      color: 'white',
      fontSize: fontSize.lg,
    },
    clearContainer: {
      alignItems: 'center',
      padding: spacing.md,
    },
  });
  return (
    <>
      <SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              data={focusHistory}
              renderItem={HistoryItem}
              style={{flex: 1}}
              contentContainerStyle={{alignItems: 'center'}}
            />
            <View style={styles.clearContainer}>
              <ButtonRounded size={75} title={'❌'} onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default FocusHistory;
