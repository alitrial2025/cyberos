import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GlassPanel } from '../ui/GlassPanel';
import { IconSymbol } from '../ui/icon-symbol';
import { AuraColors } from '@/constants/theme';

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

const DockIcon = ({ name, color }: { name: string; color: string }) => (
  <TouchableOpacity style={styles.iconContainer}>
    <IconSymbol name={name as any} size={28} color={color} />
  </TouchableOpacity>
);

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
});
