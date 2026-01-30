import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { CalcButton } from '@/components/calculator/CalcButton';
import { CalcDisplay } from '@/components/calculator/CalcDisplay';
import { ThemedView } from '@/components/themed-view';
import { ResponsiveWrapper } from '@/components/ui/ResponsiveWrapper';

export default function CalculatorScreen() {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  const handleTap = (type: string, value: string) => {
    if (type === 'number') {
      if (currentValue === '0' || shouldResetScreen) {
        setCurrentValue(value);
        setShouldResetScreen(false);
      } else {
        setCurrentValue(currentValue + value);
      }
    }

    if (type === 'operator') {
      setOperator(value);
      setPreviousValue(currentValue);
      setShouldResetScreen(true);
    }

    if (type === 'clear') {
      setCurrentValue('0');
      setOperator(null);
      setPreviousValue(null);
      setShouldResetScreen(false);
    }

    if (type === 'equal') {
      const current = parseFloat(currentValue);
      const previous = parseFloat(previousValue || '0');

      if (operator === '+') {
        setCurrentValue(`${previous + current}`);
      } else if (operator === '-') {
        setCurrentValue(`${previous - current}`);
      } else if (operator === '*') {
        setCurrentValue(`${previous * current}`);
      } else if (operator === '/') {
        setCurrentValue(`${previous / current}`);
      }

      setPreviousValue(null);
      setOperator(null);
      setShouldResetScreen(true);
    }

    if (type === 'dot') {
      if (shouldResetScreen) {
        setCurrentValue('0.');
        setShouldResetScreen(false);
      } else if (!currentValue.includes('.')) {
        setCurrentValue(currentValue + '.');
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Calculator', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ResponsiveWrapper style={styles.responsiveInner}>
          <CalcDisplay 
            currentValue={currentValue} 
            history={previousValue ? `${previousValue} ${operator || ''}` : ''} 
          />
          <View style={styles.grid}>
            <View style={styles.row}>
              <CalcButton label="C" type="action" onPress={() => handleTap('clear', 'C')} />
              <CalcButton label="/" type="operator" onPress={() => handleTap('operator', '/')} />
              <CalcButton label="*" type="operator" onPress={() => handleTap('operator', '*')} />
              <CalcButton label="-" type="operator" onPress={() => handleTap('operator', '-')} />
            </View>
            <View style={styles.row}>
              <CalcButton label="7" onPress={() => handleTap('number', '7')} />
              <CalcButton label="8" onPress={() => handleTap('number', '8')} />
              <CalcButton label="9" onPress={() => handleTap('number', '9')} />
              <CalcButton label="+" type="operator" onPress={() => handleTap('operator', '+')} />
            </View>
            <View style={styles.row}>
              <CalcButton label="4" onPress={() => handleTap('number', '4')} />
              <CalcButton label="5" onPress={() => handleTap('number', '5')} />
              <CalcButton label="6" onPress={() => handleTap('number', '6')} />
              <CalcButton label="=" type="operator" onPress={() => handleTap('equal', '=')} />
            </View>
            <View style={styles.row}>
              <CalcButton label="1" onPress={() => handleTap('number', '1')} />
              <CalcButton label="2" onPress={() => handleTap('number', '2')} />
              <CalcButton label="3" onPress={() => handleTap('number', '3')} />
              <CalcButton label="." onPress={() => handleTap('dot', '.')} />
            </View>
            <View style={styles.row}>
              <CalcButton label="0" flex={4} onPress={() => handleTap('number', '0')} />
            </View>
          </View>
        </ResponsiveWrapper>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  responsiveInner: {
    justifyContent: 'flex-end',
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
});
