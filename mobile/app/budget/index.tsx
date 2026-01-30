import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '@/components/ui/GlassCard';
import { ResponsiveWrapper } from '@/components/ui/ResponsiveWrapper';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export default function BudgetScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Salary', amount: 5000, type: 'income', date: 'Jan 22' },
    { id: '2', title: 'Grocery Store', amount: -150, type: 'expense', date: 'Jan 23' },
    { id: '3', title: 'Subscription', amount: -15, type: 'expense', date: 'Jan 23' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        acc.balance += t.amount;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const addTransaction = (type: 'income' | 'expense') => {
    if (!newTitle || !newAmount) return;
    const amount = parseFloat(newAmount);
    const transaction: Transaction = {
      id: Math.random().toString(),
      title: newTitle,
      amount: type === 'income' ? Math.abs(amount) : -Math.abs(amount),
      type,
      date: 'Today',
    };
    setTransactions([transaction, ...transactions]);
    setNewTitle('');
    setNewAmount('');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Budget', headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ResponsiveWrapper>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <ThemedText type="title" style={styles.headerTitle}>Finance</ThemedText>
            </View>
            
            <GlassCard style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>${totals.balance.toLocaleString()}</Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Income</Text>
                  <Text style={[styles.statValue, { color: '#4CAF50' }]}>+${totals.income}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Expenses</Text>
                  <Text style={[styles.statValue, { color: '#F44336' }]}>-${Math.abs(totals.expense)}</Text>
                </View>
              </View>
            </GlassCard>

            <View style={styles.inputSection}>
              <TextInput 
                style={styles.input} 
                placeholder="Description" 
                value={newTitle} 
                onChangeText={setNewTitle} 
                placeholderTextColor="#999"
              />
              <TextInput 
                style={styles.input} 
                placeholder="Amount" 
                value={newAmount} 
                onChangeText={setNewAmount} 
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <View style={styles.actionRow}>
                <Pressable onPress={() => addTransaction('income')} style={StyleSheet.flatten([styles.btn, styles.btnIncome])}>
                  <Text style={[styles.btnText, { color: '#fff' }]}>Add Income</Text>
                </Pressable>
                <Pressable onPress={() => addTransaction('expense')} style={StyleSheet.flatten([styles.btn, styles.btnExpense])}>
                  <Text style={styles.btnText}>Add Expense</Text>
                </Pressable>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Transactions</Text>
            {transactions.map(t => (
              <View key={t.id} style={styles.transaction}>
                <View style={styles.tContent}>
                  <Text style={styles.tTitle}>{t.title}</Text>
                  <Text style={styles.tDate}>{t.date}</Text>
                </View>
                <Text style={[styles.tAmount, { color: t.type === 'income' ? '#4CAF50' : '#000' }]}>
                  {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </ResponsiveWrapper>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  balanceCard: {
    padding: 32,
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputSection: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  actionRow: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 6, // Space between buttons
  },
  btnIncome: {
    backgroundColor: '#000',
  },
  btnExpense: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  btnText: {
    fontWeight: '700',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tContent: {},
  tTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tDate: {
    fontSize: 12,
    color: '#999',
  },
  tAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
