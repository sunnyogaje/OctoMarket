import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* Top Image */}
        <View style={styles.imageContainer}>
      <Image
            source={require("../assets/images/landingpage/landing.png")}
        style={styles.image}
        resizeMode="contain"
      />
        </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Texts */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Earn Rewards as you{"\n"}Shop</Text>
          <Text style={styles.subtitle}>
            Earn Octopoints on every order and use them{"\n"}
            for real purchases, discounts and offers
          </Text>
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/signup")}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
          </TouchableOpacity>
            <View style={{ width: 16 }} />
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 0,
  },
  imageContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "100%",
    maxHeight: 260,
  },
  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  textWrapper: {
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: 26,
    lineHeight: 34,
    color: "#1A1A1A",
    textAlign: "left",
    marginTop: 10,
  },
  subtitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    lineHeight: 20,
    color: "#4A4A4A",
    textAlign: "left",
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#4A154B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 120,
    maxWidth: 180,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4A154B",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 120,
    maxWidth: 180,
  },
  secondaryButtonText: {
    color: "#4A154B",
    fontWeight: "600",
    fontSize: 16,
  },
});