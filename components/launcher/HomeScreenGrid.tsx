import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  SharedValue, 
  useSharedValue, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';
import { AuraColors, Fonts } from '@/constants/theme';
import { IconSymbol } from '../ui/icon-symbol';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HOME_APPS = [
  { id: 'intel', name: 'INTELLIGENCE', icon: 'target', color: AuraColors.neonCyan },
  { id: 'threats', name: 'THREATS', icon: 'exclamationmark.shield.fill', color: AuraColors.alertRed },
  { id: 'messages', name: 'SIGNAL_LINK', icon: 'message.fill', color: AuraColors.neonCyan },
  { id: 'camera', name: 'OPTIC_SCAN', icon: 'camera.fill', color: AuraColors.white },
  { id: 'world', name: 'NODE_MAP', icon: 'globe', color: AuraColors.neonMagenta },
  { id: 'bruteforce', name: 'BRUTEFORCE', icon: 'lock.open.fill', color: AuraColors.alertRed },
  { id: 'sniffer', name: 'SNIFFER', icon: 'waveform.path.ecg', color: AuraColors.terminalGreen },
  { id: 'exploit', name: 'EXPLOIT', icon: 'bolt.fill', color: AuraColors.cyberpunkYellow },
  { id: 'vpn', name: 'VPN_TUNNEL', icon: 'network', color: AuraColors.neonCyan },
  { id: 'decrypt', name: 'DECRYPTOR', icon: 'key.fill', color: AuraColors.white },
  { id: 'injector', name: 'INJECTOR', icon: 'syringe.fill', color: AuraColors.neonMagenta },
  { id: 'neural', name: 'NEURAL', icon: 'brain.fill', color: AuraColors.neonCyan },
];

export const HomeScreenGrid = ({ progress }: { progress: SharedValue<number> }) => {
  const router = useRouter();

  const handleAppPress = (appId: string) => {
    router.push(`/apps/${appId}`);
  };

  const gridStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.4, 0.7], [0, 1]),
    transform: [
      { scale: interpolate(progress.value, [0.4, 1], [0.8, 1]) },
      { translateY: interpolate(progress.value, [0, 1], [50, 0]) }
    ],
  }));

  return (
    <Animated.View style={[styles.container, gridStyle]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {HOME_APPS.map((app) => (
            <AppIcon 
              key={app.id} 
              app={app} 
              onPress={() => handleAppPress(app.id)} 
            />
          ))}
        </View>
        <View style={{ height: 120 }} /> 
      </ScrollView>
    </Animated.View>
  );
};

const AppIcon = ({ app, onPress }: { app: any; onPress: () => void }) => {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.9);
    glow.value = withTiming(0.4, { duration: 150 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    glow.value = withTiming(0, { duration: 300 });
  };

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.appItem}
    >
      <Animated.View style={[styles.appIconContainer, { borderColor: app.color }, animatedStyle]}>
        <Animated.View style={[styles.appGlow, { backgroundColor: app.color }, glowStyle]} />
        <IconSymbol name={app.icon as any} size={28} color={app.color} />
      </Animated.View>
      <Text style={[styles.appName, { color: app.color }]}>{app.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    height: SCREEN_HEIGHT * 0.6, // Set a height for the scrollable area
  },
  scrollContent: {
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  appItem: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 120) / 3,
    marginBottom: 20,
  },
  appIconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0, 
    marginBottom: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    overflow: 'hidden',
  },
  appGlow: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  appName: {
    fontFamily: Fonts.tech,
    fontSize: 8,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
