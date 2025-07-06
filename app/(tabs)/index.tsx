import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { enableScreens } from 'react-native-screens';
enableScreens();


export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          // First launch
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/onboarding");
        } else {
          // Not first launch
          router.replace("/landing"); // or "/login" if you prefer
        }
      } catch (error) {
        console.error("Error checking launch state:", error);
        router.replace("/landing");
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    // Optional: show a loading spinner
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}