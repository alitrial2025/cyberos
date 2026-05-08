import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Line,
  Paint,
  SweepGradient,
  vec,
  BlurMask,
  useCanvasRef,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import { AuraColors } from '@/constants/theme';

interface CyberScannerProps {
  size?: number;
  color?: string;
}

export const CyberScanner: React.FC<CyberScannerProps> = ({ 
  size = 300, 
  color = AuraColors.neonCyan 
}) => {
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(0);
  const center = vec(size / 2, size / 2);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    pulse.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const sweepRotation = useDerivedValue(() => {
    return (rotation.value * 180) / Math.PI;
  });

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={styles.canvas}>
        {/* Outer Rings */}
        <Circle cx={center.x} cy={center.y} r={size * 0.45} style="stroke" strokeWidth={1} color={color} opacity={0.2} />
        <Circle cx={center.x} cy={center.y} r={size * 0.3} style="stroke" strokeWidth={1} color={color} opacity={0.3} />
        <Circle cx={center.x} cy={center.y} r={size * 0.15} style="stroke" strokeWidth={1} color={color} opacity={0.4} />

        {/* Crosshairs */}
        <Line p1={vec(0, size / 2)} p2={vec(size, size / 2)} color={color} opacity={0.1} strokeWidth={1} />
        <Line p1={vec(size / 2, 0)} p2={vec(size / 2, size)} color={color} opacity={0.1} strokeWidth={1} />

        {/* The Sweep Scanner */}
        <Group transform={useDerivedValue(() => [{ rotate: rotation.value }])} origin={center}>
          <Circle cx={center.x} cy={center.y} r={size * 0.45}>
            <SweepGradient
              c={center}
              colors={[color, 'transparent', 'transparent']}
              start={0}
              end={360}
            />
            <BlurMask blur={5} style="normal" />
          </Circle>
          
          {/* Leading Edge line */}
          <Line 
            p1={center} 
            p2={vec(center.x + size * 0.45, center.y)} 
            color={color} 
            strokeWidth={2} 
          >
            <BlurMask blur={3} style="outer" />
          </Line>
        </Group>

        {/* Central Core Pulse */}
        <Circle cx={center.x} cy={center.y} r={useDerivedValue(() => 5 + pulse.value * 10)} color={color}>
          <BlurMask blur={useDerivedValue(() => 5 + pulse.value * 10)} style="normal" />
        </Circle>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});
