import { useState, useEffect, useCallback } from 'react';

export interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  url: string;
  category?: string;
}

const API_KEY = '695493161ddc488399fbf0a6daa9570a';
const BASE_URL = 'https://newsapi.org/v2';

export function useNews(initialCategory: string = 'All') {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(initialCategory);

  const fetchNews = useCallback(async (cat: string, isRefreshing: boolean = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);

      const categoryQuery = cat === 'All' ? 'general' : cat.toLowerCase();
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&category=${categoryQuery}&apiKey=${API_KEY}`
      );
      
      const data = await response.json();

      if (data.status === 'ok') {
        // Filter out articles without images or removed content
        const filtered = (data.articles as NewsArticle[]).filter(
          item => item.urlToImage && !item.title.toLowerCase().includes('removed')
        );
        setArticles(filtered);
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError('Check your internet connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(category);
  }, [category, fetchNews]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews(category, true);
  }, [category, fetchNews]);

  return {
    articles,
    loading,
    refreshing,
    error,
    category,
    setCategory,
    onRefresh,
    retry: () => fetchNews(category)
  };
}
