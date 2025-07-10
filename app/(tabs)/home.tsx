import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Row: Greeting + Button */}
      <View style={styles.topRow}>
        <Text style={styles.greeting}>Hey Hannah</Text>
        <TouchableOpacity style={styles.sellButton}>
          <Text style={styles.sellText}>Sell an Item</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search for product" style={styles.searchInput} />
      </View>

      {/* Banner */}
      <Image source={require('@/assets/banner1.png')} style={styles.banner} resizeMode="cover" />

      {/* More sections go here... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
  },
  sellButton: {
    backgroundColor: "#4A154B",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  banner: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
  },
});
