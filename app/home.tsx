import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, useWindowDimensions, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { Accelerometer } from 'expo-sensors';
import { DynamicWallpaper } from '@/components/ui/DynamicWallpaper';
import { Dock } from '@/components/launcher/Dock';
import { AppDrawer } from '@/components/launcher/AppDrawer';
import { GamingDashboard } from '@/components/launcher/GamingDashboard';
import { HomeScreenGrid } from '@/components/launcher/HomeScreenGrid';
import { AuraColors, Fonts } from '@/constants/theme';
import { GlassPanel } from '@/components/ui/GlassPanel';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Neurological Notification Orb Concept
function NeuralOrb() {
  const scale = useSharedValue(1);
  const orbX = useSharedValue(0);
  const orbY = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 3000 }),
        withTiming(0.95, { duration: 3000 })
      ),
      -1,
      true
    );
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      orbX.value = e.translationX;
      orbY.value = e.translationY;
      scale.value = withSpring(0.8);
    })
    .onEnd(() => {
      orbX.value = withSpring(0, { damping: 10, stiffness: 80 });
      orbY.value = withSpring(0, { damping: 10, stiffness: 80 });
      scale.value = withSpring(1);
    });

  const orbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: orbX.value },
      { translateY: orbY.value },
      { scale: scale.value }
    ]
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.neuralOrbContainer, orbStyle]}>
        <BlurView intensity={60} style={styles.neuralOrb} tint="dark">
          <View style={styles.neuralOrbCore} />
        </BlurView>
        <Text style={styles.orbText}>AURA INTELLIGENCE</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function HomeLauncher() {
  const { height } = useWindowDimensions();
  const [time, setTime] = useState(new Date());

  // Animation values
  const drawerY = useSharedValue(SCREEN_HEIGHT);
  const dashboardY = useSharedValue(-SCREEN_HEIGHT);
  
  // Parallax for 3D Layering
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    Accelerometer.setUpdateInterval(16);
    const subscription = Accelerometer.addListener(({ x, y }) => {
      tiltX.value = withSpring(x * 20, { damping: 20 });
      tiltY.value = withSpring(y * 20, { damping: 20 });
    });

    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, []);

  // Gestures
  const drawerGesture = Gesture.Pan()
    .onUpdate((event) => {
      drawerY.value = Math.max(height * 0.2, SCREEN_HEIGHT + event.translationY);
    })
    .onEnd((event) => {
      if (event.velocityY < -500 || event.translationY < -height * 0.2) {
        drawerY.value = withSpring(height * 0.2, { damping: 15 });
      } else {
        drawerY.value = withSpring(SCREEN_HEIGHT, { damping: 15 });
      }
    });

  const dashboardGesture = Gesture.Pan()
    .onUpdate((event) => {
      dashboardY.value = Math.min(0, -SCREEN_HEIGHT + event.translationY);
    })
    .onEnd((event) => {
      if (event.velocityY > 500 || event.translationY > height * 0.2) {
        dashboardY.value = withSpring(0, { damping: 15 });
      } else {
        dashboardY.value = withSpring(-SCREEN_HEIGHT, { damping: 15 });
      }
    });

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerY.value }],
  }));

  const dashboardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dashboardY.value }],
  }));

  const mainContentStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      drawerY.value,
      [height * 0.2, SCREEN_HEIGHT],
      [0.9, 1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      drawerY.value,
      [height * 0.2, SCREEN_HEIGHT],
      [0.5, 1],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { scale },
        { translateX: tiltX.value },
        { translateY: -tiltY.value }
      ],
      opacity,
    };
  });

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options: any = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <DynamicWallpaper />
      
      {/* Main Content */}
      <Animated.View style={[styles.mainWrapper, mainContentStyle]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.hudContainer}>
            <Text style={styles.dateText}>{formatDate(time)}</Text>
            <Text style={styles.clockText}>{formatTime(time)}</Text>
            
            <View style={styles.metricsContainer}>
              <GlassPanel style={styles.metricItem}>
                <Text style={styles.metricLabel}>SYSTEM</Text>
                <Text style={styles.metricValue}>NOMINAL</Text>
              </GlassPanel>
              <GlassPanel style={styles.metricItem}>
                <Text style={styles.metricLabel}>NEURAL</Text>
                <Text style={[styles.metricValue, { color: AuraColors.neonCyan }]}>SYNCED</Text>
              </GlassPanel>
            </View>
          </View>

          {/* New Element: The AI Neural Orb & App Grid */}
          <View style={styles.middleSpace}>
            <NeuralOrb />
            <HomeScreenGrid />
          </View>

          <Dock />
        </SafeAreaView>
      </Animated.View>

      {/* Gaming Dashboard (Top Pull-down) */}
      <GestureDetector gesture={dashboardGesture}>
        <Animated.View style={[styles.dashboardWrapper, dashboardStyle]}>
          <GlassPanel style={styles.dashboardContent} intensity={80}>
            <GamingDashboard />
            <View style={styles.pullTabBottom} />
          </GlassPanel>
        </Animated.View>
      </GestureDetector>

      {/* App Drawer (Bottom Pull-up) */}
      <GestureDetector gesture={drawerGesture}>
        <Animated.View style={[styles.drawerWrapper, drawerStyle]}>
          <GlassPanel style={styles.drawerContent} intensity={80}>
            <View style={styles.pullTab} />
            <AppDrawer />
          </GlassPanel>
        </Animated.View>
      </GestureDetector>

      {/* Gesture Areas */}
      <View style={styles.topGestureArea} />
      <View style={styles.bottomGestureArea} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainWrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hudContainer: {
    padding: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  dateText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 8,
  },
  clockText: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 80,
    fontWeight: '300',
    marginBottom: 40,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    width: 120,
    padding: 12,
  },
  metricLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonMagenta,
    fontSize: 12,
  },
  middleSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neuralOrbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  neuralOrb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 243, 255, 0.3)',
    shadowColor: AuraColors.neonCyan,
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
  neuralOrbCore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AuraColors.neonCyan,
    opacity: 0.6,
  },
  orbText: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 16,
    opacity: 0.8,
  },
  // Overlays
  drawerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
  },
  drawerContent: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 0,
  },
  dashboardWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.6,
  },
  dashboardContent: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  pullTab: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  pullTabBottom: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
    position: 'absolute',
    bottom: 0,
  },
  topGestureArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  bottomGestureArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
});
