import React, { useState, useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image, View } from 'react-native';
import { Stack } from 'expo-router';
import { PlayfulDisplay } from '@/components/weight-converter/PlayfulDisplay';
import { PlayfulKeypad } from '@/components/weight-converter/PlayfulKeypad';
import { UnitBubbleSelector } from '@/components/weight-converter/UnitBubbleSelector';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ResponsiveWrapper } from '@/components/ui/ResponsiveWrapper';

export default function WeightConverterScreen() {
  const [inputValue, setInputValue] = useState('0');
  const [sourceUnit, setSourceUnit] = useState('KG');

  const handleKeyPress = (val: string) => {
    if (inputValue === '0' && val !== '.') {
      setInputValue(val);
    } else {
      if (val === '.' && inputValue.includes('.')) return;
      setInputValue(inputValue + val);
    }
  };

  const handleClear = () => setInputValue('0');
  const handleDelete = () => {
    if (inputValue.length === 1) {
      setInputValue('0');
    } else {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const conversions = useMemo(() => {
    const numericValue = parseFloat(inputValue) || 0;
    let grams = 0;

    // Convert to base unit (Grams)
    switch (sourceUnit) {
      case 'KG': grams = numericValue * 1000; break;
      case 'LB': grams = numericValue * 453.592; break;
      case 'ST': grams = numericValue * 6350.29; break;
      case 'G': grams = numericValue; break;
    }

    return [
      { unit: 'KG', value: (grams / 1000).toFixed(2), color: '#B2F2BB' },
      { unit: 'LB', value: (grams / 453.592).toFixed(2), color: '#A5D8FF' },
      { unit: 'ST', value: (grams / 6350.29).toFixed(2), color: '#FFF3BF' },
      { unit: 'G', value: grams.toFixed(0), color: '#FFD1DC' },
    ].filter(c => c.unit !== sourceUnit);
  }, [inputValue, sourceUnit]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Weighty!', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ResponsiveWrapper>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Image 
                source={require('@/assets/images/weight_scale.png')} 
                style={styles.logo}
              />
              <ThemedText type="title" style={styles.title}>WEIGHTY!</ThemedText>
            </View>

            <PlayfulDisplay 
              value={inputValue} 
              sourceUnit={sourceUnit} 
              conversions={conversions} 
            />

            <UnitBubbleSelector 
              selectedUnit={sourceUnit} 
              onSelect={setSourceUnit} 
            />

            <PlayfulKeypad 
              onPress={handleKeyPress} 
              onClear={handleClear} 
              onDelete={handleDelete} 
            />
          </ScrollView>
        </ResponsiveWrapper>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
  },
});
