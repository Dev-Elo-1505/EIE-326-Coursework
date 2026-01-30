import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

interface PlayfulDisplayProps {
  value: string;
  sourceUnit: string;
  conversions: { unit: string; value: string; color: string }[];
}

export function PlayfulDisplay({ value, sourceUnit, conversions }: PlayfulDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Text style={styles.inputValue}>{value || '0'}</Text>
        <Text style={styles.inputUnit}>{sourceUnit}</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {conversions.map((conv, index) => (
          <Animated.View 
            key={conv.unit}
            entering={FadeInUp.delay(index * 100)}
            layout={Layout.springify()}
            style={StyleSheet.flatten([styles.bubble, { backgroundColor: conv.color }])}
          >
            <Text style={styles.bubbleValue}>{conv.value}</Text>
            <Text style={styles.bubbleUnit}>{conv.unit}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 32,
    marginHorizontal: 16,
    borderWidth: 4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputValue: {
    fontSize: 48,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  inputUnit: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8,
    color: '#666',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bubble: {
    padding: 16,
    borderRadius: 24,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    marginRight: 12, // Space between bubbles
  },
  bubbleValue: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  bubbleUnit: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
