import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Fonts } from '@/constants/theme';

interface CalcDisplayProps {
  currentValue: string;
  history: string;
}

export function CalcDisplay({ currentValue, history }: CalcDisplayProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <Text style={[styles.history, { color: textColor + '80' }]} numberOfLines={1}>
        {history}
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.current, { color: textColor }]}>
          {currentValue}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 180,
  },
  history: {
    fontSize: 18,
    fontFamily: Fonts.mono,
    marginBottom: 8,
  },
  current: {
    fontSize: 64,
    fontFamily: Fonts.mono,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
