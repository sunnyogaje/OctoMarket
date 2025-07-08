// app/index.tsx
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const hasLaunched = await AsyncStorage.getItem("hasLaunched");

        if (!hasLaunched) {
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/onboarding");
        } else {
          const userToken = await AsyncStorage.getItem("userToken");
          router.replace(userToken ? "/(tabs)/dashboard" : "/landing");
        }
      } catch (error) {
        console.warn("App start error:", error);
        router.replace("/landing");
      } finally {
        setIsReady(true); // UI loads while routing completes
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading OctoMarket...</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A154B",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
});
