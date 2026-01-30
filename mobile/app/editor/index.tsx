import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveWrapper } from '@/components/ui/ResponsiveWrapper';
import { ThemedView } from '@/components/themed-view';

const PRIMARY_COLOR = '#2563eb';

type ThemeType = 'light' | 'sepia' | 'dark';

const THEMES = {
  light: {
    bg: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    border: '#f1f5f9',
    toolbar: '#f8fafc',
  },
  sepia: {
    bg: '#f4ecd8',
    text: '#5b4636',
    muted: '#8c7b6d',
    border: '#e2d3b5',
    toolbar: '#eee4cc',
  },
  dark: {
    bg: '#0f172a',
    text: '#f8fafc',
    muted: '#94a3b8',
    border: '#1e293b',
    toolbar: '#1e293b',
  }
};

export default function TextEditorScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isSaving, setIsSaving] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  // Mock auto-save
  useEffect(() => {
    if (content || title) {
      setIsSaving(true);
      const timer = setTimeout(() => setIsSaving(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const currentTheme = THEMES[theme];
  const wordCount = content.trim().split(/\s+/).filter(x => x).length;

  return (
    <ThemedView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen options={{ title: 'Compose', headerShown: false }} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ResponsiveWrapper maxWidth={800}>
          <View style={[styles.header, { borderBottomColor: currentTheme.border }]}>
            <Pressable style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
            </Pressable>
            <View style={styles.headerRight}>
              {isSaving ? (
                <View style={styles.savingState}>
                  <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                  <Text style={[styles.savingText, { color: currentTheme.muted }]}>Saving</Text>
                </View>
              ) : (
                <View style={styles.savingState}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={[styles.savingText, { color: currentTheme.muted }]}>Saved</Text>
                </View>
              )}
              <Pressable style={styles.publishBtn}>
                <Text style={styles.publishText}>Publish</Text>
              </Pressable>
            </View>
          </View>

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={[styles.titleInput, { color: currentTheme.text }]}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={currentTheme.muted}
                multiline
              />
              <TextInput
                style={[styles.bodyInput, { 
                  color: currentTheme.text, 
                  fontSize: fontSize,
                  lineHeight: fontSize * 1.6
                }]}
                placeholder="Start your story..."
                multiline
                value={content}
                onChangeText={setContent}
                placeholderTextColor={currentTheme.muted}
              />
            </ScrollView>

            <View style={[styles.toolbar, { 
              backgroundColor: currentTheme.toolbar,
              borderTopColor: currentTheme.border
            }]}>
              <View style={styles.toolGroup}>
                <Pressable onPress={() => setTheme('light')} style={[styles.toolBtn, theme === 'light' && styles.toolBtnActive]}>
                  <View style={[styles.themeCircle, { backgroundColor: THEMES.light.bg, borderColor: THEMES.light.text }]} />
                </Pressable>
                <Pressable onPress={() => setTheme('sepia')} style={[styles.toolBtn, theme === 'sepia' && styles.toolBtnActive]}>
                  <View style={[styles.themeCircle, { backgroundColor: THEMES.sepia.bg, borderColor: THEMES.sepia.text }]} />
                </Pressable>
                <Pressable onPress={() => setTheme('dark')} style={[styles.toolBtn, theme === 'dark' && styles.toolBtnActive]}>
                  <View style={[styles.themeCircle, { backgroundColor: THEMES.dark.bg, borderColor: THEMES.dark.text }]} />
                </Pressable>
              </View>

              <View style={styles.divider} />

              <View style={styles.toolGroup}>
                <Pressable onPress={() => setFontSize(f => Math.max(14, f - 2))} style={styles.toolBtn}>
                  <Ionicons name="remove" size={20} color={currentTheme.text} />
                </Pressable>
                <Text style={[styles.fontSizeText, { color: currentTheme.text }]}>{fontSize}</Text>
                <Pressable onPress={() => setFontSize(f => Math.min(32, f + 2))} style={styles.toolBtn}>
                  <Ionicons name="add" size={20} color={currentTheme.text} />
                </Pressable>
              </View>

              <View style={styles.stats}>
                <Text style={[styles.wordCount, { color: currentTheme.muted }]}>{wordCount} words</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  savingState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  savingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  publishBtn: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  bodyInput: {
    textAlignVertical: 'top',
    minHeight: 500,
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  toolGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  toolBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  toolBtnActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  themeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 4,
  },
  fontSizeText: {
    fontSize: 14,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  stats: {
    flex: 1,
    alignItems: 'flex-end',
  },
  wordCount: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

