import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Book smarter, shop faster',
    subtitle: 'Shop smart, book fast and earn rewards\nwhile you run your daily waka',
    video: require('../assets/videos/1.mp4'),
  },
  {
    id: '2',
    title: 'From mama put to market runs',
    subtitle: 'Get your favorites meals, house supplies\nor even fix your items with ZERO stress',
    video: require('../assets/videos/2.mp4'),
  },
  {
    id: '3',
    title: 'All your favs in one app',
    subtitle: 'Book services and grab deals with\nearning at it',
    video: require('../assets/videos/3.mp4'),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoReady, setVideoReady] = useState<boolean[]>(Array(slides.length).fill(false));
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/landing');
    }
  };

  const handleVideoReady = (index: number) => {
    const updated = [...videoReady];
    updated[index] = true;
    setVideoReady(updated);
  };

  return (
    <FlatList
      data={slides}
      horizontal
      pagingEnabled
      ref={flatListRef}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      }}
      renderItem={({ item, index }) => (
        <View style={styles.slide}>
          <Video
            source={item.video}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={index === currentIndex}
            isMuted
            onReadyForDisplay={() => handleVideoReady(index)}
          />

          <LinearGradient
            colors={['transparent', 'rgba(74,21,75,0.7)', '#4A154B']}
            locations={[0.5, 0.8, 1]}
            style={styles.gradient}
          />

          {!videoReady[index] && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}
            />
          )}

          {videoReady[index] && (
            <View style={styles.overlay}>
              <View style={styles.textBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              <View style={styles.controls}>
                <View style={styles.dots}>
                  {slides.map((_, i) => (
                    <View
                      key={i}
                      style={[styles.dot, i === currentIndex && styles.activeDot]}
                    />
                  ))}
                </View>

                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                  <Ionicons name="arrow-forward" size={24} color="#4A154B" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    backgroundColor: 'white',
  },
  video: {
    position: 'absolute',
    width,
    height,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: 1000,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 24,
    right: 24,
  },
  textBox: {
    marginBottom: 70,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 16,
  },
  nextButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 30,
  },
});
