import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Circle,
  Line,
  vec,
  BlurMask,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useDerivedValue,
  SharedValue
} from 'react-native-reanimated';
import { AuraColors } from '@/constants/theme';

interface Node {
  id: string;
  x: number;
  y: number;
}

export const NeuralMesh = ({ progress }: { progress: SharedValue<number> }) => {
  const { width, height } = useWindowDimensions();
  
  const nodes = useMemo(() => {
    const arr: Node[] = [];
    for (let i = 0; i < 15; i++) {
      arr.push({
        id: i.toString(),
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }
    return arr;
  }, [width, height]);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < 200) {
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes]);

  const time = useSharedValue(0);
  React.useEffect(() => {
    time.value = withRepeat(withTiming(10, { duration: 10000 }), -1, true);
  }, []);

  // For Skia, we can use the progress value directly if it's a shared value
  // and the component supports it.
  return (
    <Canvas style={[StyleSheet.absoluteFill, { opacity: 0.3 }]}>
      {connections.map(([n1, n2], i) => (
        <Line
          key={i}
          p1={vec(n1.x, n1.y)}
          p2={vec(n2.x, n2.y)}
          color={AuraColors.neonCyan}
          strokeWidth={1}
          opacity={progress}
        />
      ))}
      {nodes.map((node) => (
        <Circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={3}
          color={AuraColors.neonCyan}
          opacity={progress}
        >
          <BlurMask blur={3} style="normal" />
        </Circle>
      ))}
    </Canvas>
  );
};
