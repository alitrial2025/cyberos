import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GlassPanel } from '../ui/GlassPanel';
import { IconSymbol } from '../ui/icon-symbol';
import { AuraColors } from '@/constants/theme';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

export const Dock = () => {
  return (
    <View style={styles.container}>
      <GlassPanel style={styles.dock} intensity={60}>
        <View style={styles.row}>
          <DockIcon name="phone.fill" color={AuraColors.neonCyan} />
          <DockIcon name="message.fill" color={AuraColors.white} />
          <DockIcon name="camera.fill" color={AuraColors.white} />
          <DockIcon name="globe" color={AuraColors.neonMagenta} />
        </View>
      </GlassPanel>
    </View>
  );
};

const DockIcon = ({ name, color }: { name: string; color: string }) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: scale.value * 1.5 }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.85);
    glowOpacity.value = withTiming(0.6, { duration: 200 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    glowOpacity.value = withTiming(0, { duration: 400 });
  };

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.iconContainer}
    >
      <Animated.View style={[styles.glowPulse, { backgroundColor: color }, glowStyle]} />
      <Animated.View style={animatedStyle}>
        <IconSymbol name={name as any} size={28} color={color} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  dock: {
    width: '100%',
    maxWidth: 400,
    height: 80,
    justifyContent: 'center',
    borderRadius: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.5,
  },
});
