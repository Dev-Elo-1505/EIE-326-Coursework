import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ResponsiveWrapper } from "@/components/ui/ResponsiveWrapper";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>Toolbox 🛠️</ThemedText>
            <ThemedText style={styles.subtext}>Your daily essentials, made fun.</ThemedText>
          </View>

          <View style={styles.grid}>
            <Link href="/calculator" asChild>
              <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: '#E3F2FD' }])}>
                <Text style={styles.cardEmoji}>🧮</Text>
                <Text style={styles.cardTitle}>Calculator</Text>
                <Text style={styles.cardSub}>Precision tool</Text>
              </Pressable>
            </Link>

            <Link href={"/weight-converter" as any} asChild>
              <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: '#F3E5F5' }])}>
                <Image 
                  source={require('@/assets/images/weight_scale.png')} 
                  style={styles.cardIcon}
                />
                <Text style={styles.cardTitle}>Weighty!</Text>
                <Text style={styles.cardSub}>Bouncy units</Text>
              </Pressable>
            </Link>

            <Link href={"/budget" as any} asChild>
              <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: '#E8F5E9' }])}>
                <Text style={styles.cardEmoji}>💰</Text>
                <Text style={styles.cardTitle}>Budget</Text>
                <Text style={styles.cardSub}>Meta style</Text>
              </Pressable>
            </Link>

            <Link href={"/editor" as any} asChild>
              <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: '#FFF3E0' }])}>
                <Text style={styles.cardEmoji}>📝</Text>
                <Text style={styles.cardTitle}>Editor</Text>
                <Text style={styles.cardSub}>Notion style</Text>
              </Pressable>
            </Link>

            <Link href={"/news" as any} asChild>
              <Pressable style={StyleSheet.flatten([styles.card, { backgroundColor: '#FCE4EC' }])}>
                <Text style={styles.cardEmoji}>📰</Text>
                <Text style={styles.cardTitle}>News</Text>
                <Text style={styles.cardSub}>Daily feed</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </ResponsiveWrapper>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8, // Offset card margins
  },
  card: {
    width: '43%', // Slightly reduced to accommodate margins
    margin: 8,
    aspectRatio: 0.9,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  cardEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  cardSub: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
});
