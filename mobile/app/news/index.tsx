import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveWrapper } from '@/components/ui/ResponsiveWrapper';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useNews, NewsArticle } from '@/hooks/useNews';

const PRIMARY_COLOR = '#2563eb'; 
const CATEGORIES = ['All', 'Technology', 'Business', 'Science', 'Entertainment', 'Health', 'Sports'];

export default function NewsScreen() {
  const { 
    articles, 
    loading, 
    refreshing, 
    error, 
    category, 
    setCategory, 
    onRefresh, 
    retry 
  } = useNews('All');

  const renderArticle = (item: NewsArticle, index: number) => {
    const isFeatured = index === 0 && category === 'All';

    if (isFeatured) {
      return (
        <Pressable key={index} style={styles.featuredCard}>
          <Image source={{ uri: item.urlToImage }} style={styles.featuredImage} contentFit="cover" />
          <View style={styles.featuredOverlay}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.source.name}</Text>
            </View>
            <Text style={styles.featuredTitle} numberOfLines={3}>{item.title}</Text>
            <Text style={styles.featuredTime}>
              {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Text>
          </View>
        </Pressable>
      );
    }

    return (
      <Pressable key={index} style={styles.articleCard}>
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} contentFit="cover" />
        <View style={styles.articleContent}>
          <Text style={styles.articleSource}>{item.source.name}</Text>
          <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.articleFooter}>
            <Text style={styles.articleTime}>
              {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Text>
            <Ionicons name="chevron-forward" size={14} color="#ccc" />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Global News', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ResponsiveWrapper>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerLabel}>Good Morning</Text>
              <ThemedText type="title" style={styles.headerTitle}>Horizon News</ThemedText>
            </View>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </Pressable>
          </View>

          <View style={styles.categoryWrapper}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoryList}
            >
              {CATEGORIES.map(cat => (
                <Pressable 
                  key={cat} 
                  onPress={() => setCategory(cat)}
                  style={[styles.catPill, category === cat && styles.catPillActive]}
                >
                  <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <ScrollView 
            contentContainerStyle={styles.content} 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_COLOR} />
            }
          >
            {loading && !refreshing ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text style={styles.loadingText}>Fetching latest stories...</Text>
              </View>
            ) : error ? (
              <View style={styles.center}>
                <Ionicons name="cloud-offline-outline" size={64} color="#eee" />
                <Text style={styles.errorText}>{error}</Text>
                <Pressable onPress={retry} style={styles.retryBtn}>
                  <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.list}>
                {articles.map((item, index) => renderArticle(item, index))}
              </View>
            )}
          </ScrollView>
        </ResponsiveWrapper>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  categoryWrapper: {
    paddingBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
  },
  catPillActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  catText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  catTextActive: {
    color: '#fff',
  },
  content: {
    paddingBottom: 40,
  },
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
  featuredCard: {
    height: 380,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 10,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 12,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  featuredTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  articleCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    // Subtle shadow for iOS
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 2,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  articleContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  articleSource: {
    fontSize: 11,
    fontWeight: '800',
    color: PRIMARY_COLOR,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 22,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  center: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  retryBtn: {
    marginTop: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
});

