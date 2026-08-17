import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';

interface SpinningConnectionsFabProps {
  isFocused: boolean;
}

export function SpinningConnectionsFab({ isFocused }: SpinningConnectionsFabProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      spinValue.setValue(0);
      const animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isFocused, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.fabContainer}>
      {isFocused && (
        <Animated.View
          style={[
            styles.spinningRing,
            { transform: [{ rotate: spin }] },
          ]}
        />
      )}
      <View style={styles.centerFab}>
        <MaterialIcons name="people-alt" size={24} color={Theme.colors.fabIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinningRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2.5,
    borderTopColor: Theme.colors.white, // White
    borderRightColor: Theme.colors.primaryContainer, // Orange (Saffron)
    borderBottomColor: Theme.colors.white, // White
    borderLeftColor: Theme.colors.secondaryContainer, // Mint Green
  },
  centerFab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
