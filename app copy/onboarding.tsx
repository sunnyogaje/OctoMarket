import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import B1 from "../assets/images/onboarding/b1.svg";
import B2 from "../assets/images/onboarding/b2.svg";
import B3 from "../assets/images/onboarding/b3.svg";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to\nOctoMarket",
    subtitle:
      "Shop smart, book fast and earn rewards\nwhile you run your daily waka",
    image: B1,
  },
  {
    id: "2",
    title: "From Market Runs\nto Service Bookings",
    subtitle:
      "Order your favorite foods, book services,\nand grab deals in one app.",
    image: B2,
  },
  {
    id: "3",
    title: "Book & Reserve \nInstantly",
    subtitle:
      "Reserve that table, stylist, or plug.\nNo 'abeg, hold on.' Just tap and go.",
    image: B3,
  },
];

export default function OnboardingScreen() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
  });

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  if (!fontsLoaded) return null;

  const handleSkip = async () => {
    router.replace("/landing");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.page}>
      <item.image width={"100%"} height={330} style={styles.image} />
      <View style={styles.card}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={renderItem}
      />

      {/* Fixed Progress + Skip Button */}
      <View style={styles.bottomFixed}>
        <View style={styles.progressContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    width,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    marginTop: 95,
  },
  card: {
    width: "100%",
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
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dot: {
    width: 35,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#4A154B",
    width: 45,
    height: 10,
    borderRadius: 5,
  },
  buttonWrapper: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginTop: 35,
  },
  skipButton: {
    backgroundColor: "#4A154B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: 100,
    alignSelf: "flex-end",
  },
  skipButtonText: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 17,
    alignSelf: "center",
  },
  bottomFixed: {
    position: "absolute",
    bottom: 85,
    width: "100%",
    paddingHorizontal: 20,
  },
});