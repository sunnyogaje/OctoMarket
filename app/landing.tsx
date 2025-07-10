import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import LandingSVG from "../assets/images/landingpage/landing.svg";

export default function LandingScreen() {
  const router = useRouter();

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem("hasLaunched");
      alert("App storage cleared. Restart to see onboarding again.");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
       
        <LandingSVG width="100%" height={330} style={styles.image} />

        
          {/* Clear Storage Text */}
          {/* <TouchableOpacity onPress={handleClearStorage}>
            <Text style={styles.clearText}>Clear storage</Text>
          </TouchableOpacity> */}

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
    </SafeAreaView>
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
    marginTop: 50,
  },
  card: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#E0E0E0",
    marginTop: 50,
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
    paddingHorizontal: 20,
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
  clearText: {
    color: "#4A154B",
    textAlign: "center",
    marginTop: 40,
    textDecorationLine: "underline",
    fontWeight: "800",
    fontSize: 30,
  },
});