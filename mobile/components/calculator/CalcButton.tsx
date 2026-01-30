import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Fonts } from '@/constants/theme';

interface CalcButtonProps {
  label: string;
  onPress: (label: string) => void;
  type?: 'number' | 'operator' | 'action';
  flex?: number;
}

export function CalcButton({ label, onPress, type = 'number', flex = 1 }: CalcButtonProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(label);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, flex },
        pressed && styles.pressed,
        type === 'operator' && styles.operator,
        type === 'action' && styles.action,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2, // Very subtle border
    borderColor: '#444',
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: '#333',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.mono,
  },
  operator: {
    // Subtle distinction for operators
  },
  action: {
    // Subtle distinction for actions
  },
});
