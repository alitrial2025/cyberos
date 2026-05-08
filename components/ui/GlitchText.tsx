import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import { Fonts } from '@/constants/theme';

interface GlitchTextProps {
  text: string;
  style?: TextStyle;
  interval?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  style, 
  interval = 3000 
}) => {
  const glitchX = useSharedValue(0);
  const glitchOpacity = useSharedValue(1);

  useEffect(() => {
    const runGlitch = () => {
      glitchX.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-2, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      glitchOpacity.value = withSequence(
        withTiming(0.3, { duration: 50 }),
        withTiming(1, { duration: 50 }),
        withTiming(0.5, { duration: 50 }),
        withTiming(1, { duration: 100 })
      );
    };

    const timer = setInterval(runGlitch, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: glitchX.value }],
    opacity: glitchOpacity.value,
  }));

  const shadowStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateX: glitchX.value * -1.5 }],
    opacity: glitchOpacity.value * 0.5,
    color: '#ff00ff', // Magenta glitch
  }));

  const shadowStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: glitchX.value * 1.2 }],
    opacity: glitchOpacity.value * 0.5,
    color: '#00ffff', // Cyan glitch
  }));

  return (
    <View>
      <Animated.Text style={[style, styles.absolute, shadowStyle1]}>{text}</Animated.Text>
      <Animated.Text style={[style, styles.absolute, shadowStyle2]}>{text}</Animated.Text>
      <Animated.Text style={[style, animatedStyle]}>{text}</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
