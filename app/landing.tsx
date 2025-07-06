import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={require("../assets/images/landingpage/landing.png")} // Change to your desired image
        style={styles.image}
        resizeMode="contain"
      />

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

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    width: "100%",
    height: 330,
    marginTop: 100,
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 40,
    paddingVertical: 24,
    paddingHorizontal: 20,
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
    justifyContent: "space-between",
    marginTop: 80,
    paddingHorizontal: 20, // optional: adds padding to sides
  },
  primaryButton: {
    width: 140,
    backgroundColor: "#4A154B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    width: 140,
    borderWidth: 1,
    borderColor: "#4A154B",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4A154B",
    fontWeight: "600",
    fontSize: 16,
  },
});