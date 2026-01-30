import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { Layout, FadeIn } from 'react-native-reanimated';

interface UnitBubbleSelectorProps {
  selectedUnit: string;
  onSelect: (unit: string) => void;
}

const UNITS = [
  { label: 'KG', color: '#B2F2BB' },
  { label: 'LB', color: '#A5D8FF' },
  { label: 'ST', color: '#FFF3BF' },
  { label: 'G', color: '#FFD1DC' },
];

export function UnitBubbleSelector({ selectedUnit, onSelect }: UnitBubbleSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR STARTING UNIT!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {UNITS.map((unit) => (
          <Pressable
            key={unit.label}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSelect(unit.label);
            }}
            style={StyleSheet.flatten([
              styles.bubble,
              { backgroundColor: unit.color },
              selectedUnit === unit.label && styles.selected,
            ])}
          >
            <Text style={styles.label}>{unit.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: 1,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  bubble: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
    marginRight: 16, // Space between bubbles
  },
  selected: {
    borderColor: '#000',
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 18,
    fontWeight: '900',
  },
});
