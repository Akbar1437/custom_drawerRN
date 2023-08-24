import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constants/colors';
import {
  END_WIDTH,
  INITIAL_WIDTH,
  START_WIDTH,
  WIDTH,
} from '../../constants/config';
import HamBurgerIcon from '../svgIcons/HamburgerIcon';
import SearchIcon from '../svgIcons/SearchIcon';
import UsersIcon from '../svgIcons/UsersIcon';

const SecondSheet = ({
  sheetAnimVal,
  activeSheet,
}: {
  sheetAnimVal: SharedValue<number>;
  activeSheet: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sheetAnimVal.value}],
    };
  });

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = sheetAnimVal.value;
      ctx.isHorizontalGesture = false; // Initialize as false
    },
    onActive: (event, ctx) => {
      if (!ctx.isHorizontalGesture) {
        // Check if the gesture is primarily horizontal
        const dx = Math.abs(event.translationX);
        const dy = Math.abs(event.translationY);

        ctx.isHorizontalGesture = dx > dy;
      }

      if (ctx.isHorizontalGesture) {
        sheetAnimVal.value = event.translationX + ctx.x;
      }
    },
    onEnd: (event, ctx: any) => {
      if (!ctx.isHorizontalGesture) {
        return; // Ignore vertical gestures
      }

      if (event.translationX > 0 && activeSheet.value === 1) {
        // If dragging right on the first sheet, keep it unchanged
        sheetAnimVal.value = ctx.x;
      } else if (event.translationX < 0 && activeSheet.value === 3) {
        // If dragging left on the third sheet, keep it unchanged
        sheetAnimVal.value = ctx.x;
      } else if (Math.abs(event.translationX) > WIDTH / 3) {
        // If dragging more than a third of the screen width
        if (event.translationX > 0 && activeSheet.value === 2) {
          // Dragging right on the second sheet, switch to first
          sheetAnimVal.value = withTiming(START_WIDTH);
          activeSheet.value = 1;
        } else if (event.translationX < 0 && activeSheet.value === 2) {
          // Dragging left on the second sheet, switch to third
          sheetAnimVal.value = withTiming(END_WIDTH);
          activeSheet.value = 3;
        }
      } else {
        // Return to the initial position
        sheetAnimVal.value = withTiming(INITIAL_WIDTH);
        activeSheet.value = 2;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.secondSheetContainer, animatedStyle]}>
        {/* you can seperate this in its own component */}
        <View style={styles.headerContainer}>
          <View style={styles.innerContainer}>
            <Pressable
              onPress={() => {
                if (activeSheet.value === 2) {
                  sheetAnimVal.value = withTiming(START_WIDTH);
                  activeSheet.value = 1;
                } else if (activeSheet.value !== 2) {
                  sheetAnimVal.value = withTiming(INITIAL_WIDTH);
                  activeSheet.value = 2;
                }
              }}>
              <HamBurgerIcon width={20} height={20} fill="white" />
            </Pressable>
            <View style={{flexDirection: 'row'}}>
              <SearchIcon width={20} height={20} fill="white" />
              <View style={{marginLeft: 20}}>
                <Pressable
                  onPress={() => {
                    if (activeSheet.value === 2) {
                      sheetAnimVal.value = withTiming(END_WIDTH);
                      activeSheet.value = 3;
                    } else {
                      sheetAnimVal.value = withTiming(INITIAL_WIDTH);
                      activeSheet.value = 2;
                    }
                  }}>
                  <UsersIcon width={20} height={20} fill="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Text style={{color: 'white'}}>Second Sheet</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SecondSheet;

const styles = StyleSheet.create({
  secondSheetContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.sheetColor,
  },
  headerContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.navColor,
  },
  innerContainer: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
