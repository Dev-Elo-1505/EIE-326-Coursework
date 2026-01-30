import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="calculator/index" options={{ title: 'Calculator' }} />
        <Stack.Screen name="weight-converter/index" options={{ title: 'Weighty!' }} />
        <Stack.Screen name="budget/index" options={{ title: 'Finance' }} />
        <Stack.Screen name="editor/index" options={{ title: 'Drafts' }} />
        <Stack.Screen name="news/index" options={{ title: 'Horizon' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
