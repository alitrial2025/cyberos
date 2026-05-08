import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  LinearGradient,
  Rect,
  vec,
  BlurMask,
} from '@shopify/react-native-skia';
import { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useDerivedValue,
  cancelAnimation,
  Easing
} from 'react-native-reanimated';
import { AuraColors } from '@/constants/theme';

export const DynamicWallpaper = () => {
  const { width, height } = useWindowDimensions();
  
  // Reanimated clock
  const time = useSharedValue(0);
  
  // Simulated music pulse
  const pulse = useSharedValue(1);

  useEffect(() => {
    time.value = withRepeat(
      withTiming(10000, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    );
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 1500 }),
      -1,
      true
    );
    
    return () => {
      cancelAnimation(time);
      cancelAnimation(pulse);
    };
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={[AuraColors.black, '#0a0a1a', '#1a0a1a']}
        />
      </Rect>
      
      <AnimatedBlob 
        x={width * 0.2} 
        y={height * 0.3} 
        color={AuraColors.neonCyan} 
        pulse={pulse}
        time={time}
        offset={0}
      />
      <AnimatedBlob 
        x={width * 0.8} 
        y={height * 0.7} 
        color={AuraColors.neonMagenta} 
        pulse={pulse}
        time={time}
        offset={Math.PI}
      />
    </Canvas>
  );
};

const AnimatedBlob = ({ x, y, color, pulse, time, offset }: any) => {
  const animatedX = useDerivedValue(() => {
    return x + Math.sin(time.value / 1000 + offset) * 50;
  });

  const animatedY = useDerivedValue(() => {
    return y + Math.cos(time.value / 1500 + offset) * 100;
  });

  const radius = useDerivedValue(() => {
    return (150 + Math.sin(time.value / 800) * 20) * pulse.value;
  });

  return (
    <Rect 
      x={animatedX} 
      y={animatedY} 
      width={radius} 
      height={radius}
      color={color}
      opacity={0.3}
    >
      <BlurMask blur={80} style="normal" />
    </Rect>
  );
};
