import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, useWindowDimensions, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useDerivedValue,
  withSpring, 
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolate,
  SharedValue
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { Accelerometer } from 'expo-sensors';
import { DynamicWallpaper } from '@/components/ui/DynamicWallpaper';
import { Dock } from '@/components/launcher/Dock';
import { HomeScreenGrid } from '@/components/launcher/HomeScreenGrid';
import { AuraColors, Fonts } from '@/constants/theme';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SystemLog } from '@/components/ui/SystemLog';
import { NeuralMesh } from '@/components/ui/NeuralMesh';
import { ThreatFeed } from '@/components/ui/ThreatFeed';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Neurological Notification Orb Concept
function NeuralOrb({ progress }: { progress: SharedValue<number> }) {
  const scale = useSharedValue(1);
  const orbX = useSharedValue(0);
  const orbY = useSharedValue(0);
  
  const orbOpacity = useDerivedValue(() => 1 - progress.value);

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
      { translateY: orbY.value + interpolate(progress.value, [0, 1], [0, 50]) },
      { scale: scale.value * interpolate(progress.value, [0, 1], [1, 2]) }
    ],
    opacity: interpolate(progress.value, [0, 0.5, 1], [1, 0.8, 1])
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.neuralOrbContainer, orbStyle]}>
        <BlurView intensity={60} style={styles.neuralOrb} tint="dark">
          <View style={styles.neuralOrbCore} />
        </BlurView>
        <Animated.Text style={[styles.orbText, { opacity: orbOpacity }]}>
          AURA INTELLIGENCE
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function HomeLauncher() {
  const { height } = useWindowDimensions();
  const [time, setTime] = useState(new Date());

  // Unified transition progress
  const drawerProgress = useSharedValue(0);
  
  // Parallax for 3D Layering
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  const dockOpacity = useDerivedValue(() => 1 - drawerProgress.value);
  const hintOpacity = useDerivedValue(() => 0.5 - drawerProgress.value);

  const clockJitter = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Subtle Glitch Loop
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        clockJitter.value = withSequence(
          withTiming(2, { duration: 50 }),
          withTiming(-2, { duration: 50 }),
          withTiming(0, { duration: 50 })
        );
      }
    }, 1000);

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
      drawerProgress.value = Math.max(0, Math.min(1, -event.translationY / (height * 0.5)));
    })
    .onEnd((event) => {
      if (event.velocityY < -500 || drawerProgress.value > 0.4) {
        drawerProgress.value = withSpring(1, { damping: 15 });
      } else {
        drawerProgress.value = withSpring(0, { damping: 15 });
      }
    });

  const hudStyle = useAnimatedStyle(() => ({
    opacity: interpolate(drawerProgress.value, [0, 0.5], [1, 0]),
    transform: [
      { scale: interpolate(drawerProgress.value, [0, 0.5], [1, 0.8]) },
      { translateY: interpolate(drawerProgress.value, [0, 1], [0, -100]) }
    ],
  }));

  const clockStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: clockJitter.value },
      { skewX: `${clockJitter.value}deg` }
    ],
    color: clockJitter.value !== 0 ? AuraColors.neonMagenta : AuraColors.white,
  }));

  const meshStyle = useAnimatedStyle(() => ({
    opacity: drawerProgress.value,
    transform: [{ scale: interpolate(drawerProgress.value, [0, 1], [0.8, 1]) }]
  }));

  const mainContentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value },
      { translateY: -tiltY.value }
    ],
  }));

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
      <SystemLog />
      <NeuralMesh progress={drawerProgress} />
      
      <GestureDetector gesture={drawerGesture}>
        <Animated.View style={[styles.mainWrapper, mainContentStyle]}>
          <SafeAreaView style={styles.safeArea}>
            {/* HUD Content */}
            <Animated.View style={[styles.hudContainer, hudStyle]}>
              <View style={styles.hudHeader}>
                <View style={styles.hudStatus}>
                  <View style={[styles.statusDot, { backgroundColor: AuraColors.terminalGreen }]} />
                  <Text style={styles.hudStatusText}>ENCRYPTED_NODE: 192.168.1.1</Text>
                </View>
                <Text style={styles.dateText}>{formatDate(time)}</Text>
              </View>

              <View style={styles.clockWrapper}>
                <Animated.Text style={[styles.clockText, clockStyle]}>{formatTime(time)}</Animated.Text>
                <View style={styles.clockGlow} />
              </View>
              
              <View style={styles.telemetryGrid}>
                <View style={styles.telemetryItem}>
                  <Text style={styles.telemetryLabel}>BATT</Text>
                  <View style={styles.telemetryBarContainer}>
                    <View style={[styles.telemetryBar, { width: '82%', backgroundColor: AuraColors.neonCyan }]} />
                  </View>
                </View>
                <View style={styles.telemetryItem}>
                  <Text style={styles.telemetryLabel}>CPU</Text>
                  <View style={styles.telemetryBarContainer}>
                    <View style={[styles.telemetryBar, { width: '45%', backgroundColor: AuraColors.neonMagenta }]} />
                  </View>
                </View>
                <View style={styles.telemetryItem}>
                  <Text style={styles.telemetryLabel}>MEM</Text>
                  <View style={styles.telemetryBarContainer}>
                    <View style={[styles.telemetryBar, { width: '68%', backgroundColor: AuraColors.cyberpunkYellow }]} />
                  </View>
                </View>
              </View>

              <View style={styles.threatFeedWrapper}>
                <ThreatFeed />
              </View>

              <View style={styles.metricsContainer}>
                <GlassPanel style={styles.metricItem}>
                  <Text style={styles.metricLabel}>OS_INTEGRITY</Text>
                  <Text style={styles.metricValue}>SECURE</Text>
                </GlassPanel>
                <GlassPanel style={styles.metricItem}>
                  <Text style={styles.metricLabel}>FIREWALL</Text>
                  <Text style={[styles.metricValue, { color: AuraColors.neonCyan }]}>ACTIVE</Text>
                </GlassPanel>
              </View>
            </Animated.View>

            {/* Neural Orb & Grid */}
            <View style={styles.middleSpace}>
              <NeuralOrb progress={drawerProgress} />
              <HomeScreenGrid progress={drawerProgress} />
            </View>

            <Animated.View style={{ opacity: dockOpacity }}>
              <Dock />
            </Animated.View>
          </SafeAreaView>
        </Animated.View>
      </GestureDetector>

      {/* Swipe Hint */}
      <Animated.View style={[styles.swipeHint, { opacity: hintOpacity }]}>
        <View style={styles.pullTab} />
        <Text style={styles.swipeText}>NEURAL LINK</Text>
      </Animated.View>
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
    paddingTop: 60,
    alignItems: 'center',
    width: '100%',
  },
  hudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  hudStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  hudStatusText: {
    fontFamily: Fonts.tech,
    color: AuraColors.terminalGreen,
    fontSize: 8,
    letterSpacing: 1,
  },
  dateText: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 2,
  },
  clockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  clockText: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 90,
    fontWeight: '300',
    letterSpacing: -2,
    textShadowColor: 'rgba(0, 243, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  clockGlow: {
    position: 'absolute',
    width: 200,
    height: 100,
    backgroundColor: AuraColors.neonCyan,
    opacity: 0.05,
    borderRadius: 50,
  },
  telemetryGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 20,
  },
  telemetryItem: {
    flex: 1,
    gap: 6,
  },
  telemetryLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 7,
    letterSpacing: 1,
  },
  telemetryBarContainer: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  telemetryBar: {
    height: '100%',
  },
  threatFeedWrapper: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 30,
    overflow: 'hidden',
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
  swipeHint: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  pullTab: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 10,
  },
  swipeText: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 4,
  },
  neuralOrbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
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
});
