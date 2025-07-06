import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to\nOctoMarket",
    subtitle: "Shop smart, book fast and earn rewards\nwhile you run your daily waka",
    image: require("../assets/images/onboarding/b1.png"),
  },
  {
    id: "2",
    title: "From Market Runs\nto Service Bookings",
    subtitle: "Order your favorite foods, book services,\nand grab deals in one app.",
    image: require("../assets/images/onboarding/b2.png"),
  },
  {
    id: "3",
    title: "Book & Reserve \nInstantly",
    subtitle: "Reserve that table, stylist, or plug.\nNo 'abeg, hold on.' Just tap and go.",
    image: require("../assets/images/onboarding/b3.png"),
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
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("hasLaunched", "true");
      } catch (error) {
        console.error("Error setting first launch flag:", error);
      }
      router.replace("/landing");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.page}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.card}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
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
              {currentIndex === slides.length - 1 ? "Skip" : "Skip"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
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
  );
}

const styles = StyleSheet.create({
  page: {
    width,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 330,
    marginTop: 130,
  },
  card: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 50,
    paddingVertical: 24,
    paddingHorizontal: 20,
    // justifyContent: "space-between",
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
    marginTop: 58,
  },
  dot: {
    width: 35,
    height: 7,
    borderRadius: 3,
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
    // marginTop: 20,
  },
  skipButton: {
    backgroundColor: "#4A154B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 50,
    width: 100,
  },
  skipButtonText: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 17,
    alignSelf: "center",
  },
});