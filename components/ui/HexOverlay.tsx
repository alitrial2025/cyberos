import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { AuraColors, Fonts } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export const HexOverlay = () => {
  const [hexData, setHexData] = useState<string[]>([]);

  useEffect(() => {
    const generateHex = () => {
      const rows = 20;
      const data = [];
      for (let i = 0; i < rows; i++) {
        let row = '';
        for (let j = 0; j < 8; j++) {
          row += Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase() + ' ';
        }
        data.push(row);
      }
      setHexData(data);
    };

    const interval = setInterval(generateHex, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {hexData.map((row, i) => (
        <Text key={i} style={styles.hexText}>
          {row}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    padding: 10,
  },
  hexText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 10,
    lineHeight: 14,
  },
});
