import React from 'react';
import { StyleSheet, View, ViewProps, Platform } from 'react-native';

interface ResponsiveWrapperProps extends ViewProps {
  maxWidth?: number;
}

export function ResponsiveWrapper({ children, style, maxWidth = 600, ...props }: ResponsiveWrapperProps) {
  return (
    <View style={styles.outer}>
      <View style={[styles.inner, { maxWidth }, style]} {...props}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  inner: {
    flex: 1,
    width: '100%',
  },
});
