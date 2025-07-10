import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapApp = async () => {
      try {
        // Simulate any setup: API, token, user data, etc.
        await new Promise(resolve => setTimeout(resolve, 2000)); // Fake delay

        // Example: check if user has completed onboarding
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");

        if (!hasLaunched) {
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/onboarding");
        } else {
          // TODO: Check login status here, e.g. token
          const userToken = await AsyncStorage.getItem("userToken");
          if (userToken) {
            router.replace("/(tabs)");
          } else {
            router.replace("/landing");
          }
        }
      } catch (e) {
        console.error("Startup error:", e);
        router.replace("/landing");
      } finally {
        setLoading(false);
      }
    };

    bootstrapApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading OctoMarket...</Text>
      <ActivityIndicator size="large" color="#6B21A8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500"
  }
});
