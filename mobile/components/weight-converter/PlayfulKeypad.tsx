import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface PlayfulKeypadProps {
  onPress: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
}

const Key = ({ label, onPress, color = '#FFF3BF' }: { label: string; onPress: () => void; color?: string }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.keyWrapper}
    >
      <Animated.View style={[styles.key, { backgroundColor: color }, animatedStyle]}>
        <Text style={styles.keyText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export function PlayfulKeypad({ onPress, onClear, onDelete }: PlayfulKeypadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {keys.map((key) => (
          <Key key={key} label={key} onPress={() => onPress(key)} />
        ))}
        <Key label="DEL" color="#A5D8FF" onPress={onDelete} />
        <View style={styles.clearWrapper}>
          <Key label="CLEAR" color="#FFD1DC" onPress={onClear} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  keyWrapper: {
    width: '30%',
    aspectRatio: 1,
    padding: 8,
  },
  key: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  clearWrapper: {
    width: '90%',
    height: 80,
    marginTop: 8,
  },
});
