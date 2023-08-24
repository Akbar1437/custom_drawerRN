import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import BottomTab from './src/component/Home/BottomTab';
import FirstSheet from './src/component/Home/FirstSheet';
import SecondSheet from './src/component/Home/SecondSheet';
import ThirdSheet from './src/component/Home/ThirdSheet';
import {colors} from './src/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const sheetAnimVal = useSharedValue(0);
  const activeSheet = useSharedValue(2);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.sheetColor} />
      <View style={{width: '100%', height: '100%'}}>
        <FirstSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <ThirdSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <SecondSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <BottomTab sheetAnimVal={sheetAnimVal} />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
